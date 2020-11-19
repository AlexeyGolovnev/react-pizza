import React, {useContext, useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import { firebaseDb } from '../../firebase';
import { useHistory } from 'react-router';
import { getUserProfile } from '../../redux/action';
import { DispatchContext } from '../../context';
import { useSelector } from 'react-redux';
import InputMask from 'react-input-mask';
import firebase from 'firebase';

function AuthForm () {
  const { dispatch } = useContext(DispatchContext);
  const { register, handleSubmit, errors, clearErrors, trigger } = useForm();
  const history = useHistory();
  const [errorMsg, setErrorMsg] = useState('');
  const [isIncorrectPhone, setIsIncorrectPhone] = useState(false);
  const [hasCodeSend, setHasCodeSend] = useState(false);
  const [isIncorrectCode, setIsIncorrectCode] = useState(false);
  const [wrongCodeMsg, setWrongCodeMsg] = useState('');
  const [timer, setTimer] = useState(0);
  const user = useSelector(state => state.user);
  let intervalId = '';
  let timeoutId = '';

  useEffect(() => {
    if (user.id) {
      history.push('/user');
    }
  }, [user]);
  useEffect(() => {
    if (isIncorrectCode) {
      setWrongCodeMsg('Wrong code entered');
    }
  }, [isIncorrectCode]);
  useEffect(() => {
    if (hasCodeSend) {
      setTimer(60);
      intervalId = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      timeoutId = setTimeout(() => {
        setHasCodeSend(false);
        clearInterval(intervalId);
      }, 60000);
    }
    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [hasCodeSend]);

  const setUpRecaptcha = () => {
    try {
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible',
        'callback': () => sendCodeToPhone(),
        'expired-callback': () => {
          setErrorMsg('Captcha has expired');
        }
      });
    } catch (error) {
      setErrorMsg('Request limit exceeded. Please try again later');
    }
  };
  const sendCodeToPhone = (formData) => {
    if (formData) {
      setUpRecaptcha();
      let { phone } = formData;
      phone = phone.split('-').join('').split(' ').join('');
      const appVerifier = window.recaptchaVerifier;
      firebase.auth().signInWithPhoneNumber(phone, appVerifier)
        .then(confirmationResult => {
          window.confirmationResult = confirmationResult;
          setHasCodeSend(true);
          setIsIncorrectCode(false);
        })
        .catch(error => error && setErrorMsg('Request limit exceeded. Please try again later'));
    }
  };
  const checkVerificationCode = (data) => {
    const { verificationCode } = data;
    window.confirmationResult && window.confirmationResult.confirm(verificationCode)
      .then(result => {
        if (result.user.uid) {
          if (result.additionalUserInfo.isNewUser) {
            firebaseDb.collection('users').doc(result.user.uid).set({
              id: result.user.uid,
              name: '',
              phone: result.user.phoneNumber,
              street: '',
              house: '',
              entrance: '',
              floor: '',
              apartment: ''
            }).then();
          }
          dispatch(getUserProfile(result.user.uid));
          setHasCodeSend(false);
          history.push('/user');
        }
      })
      .catch(error => error && setIsIncorrectCode(true));
  };
  const backToPhoneInput = (e) => {
    e.preventDefault();
    setHasCodeSend(false);
  };
  const handleVerificationCodeInput = () => {
    setWrongCodeMsg('');
    clearErrors('verificationCode');
  };
  const checkPhoneValidity = async () => {
    setErrorMsg('');
    const result = await trigger('phone');
    result ? setIsIncorrectPhone(false) : setIsIncorrectPhone(true);
  };

  return (
    <div className='authForm'>
      <div className='authForm__inner'>
        <div className='authForm__forms-box'>
          { !hasCodeSend
            ? <>
              <div className='authForm__phone-form-box'>
                <div className='authForm__title-box'>
                  <h2 className='authForm__title'>Login</h2>
                  <span>{errorMsg}</span>
                </div>
                <form onSubmit={handleSubmit(sendCodeToPhone)} className='authForm__phone-form'>
                  <div>
                    <label htmlFor='phone'>Phone</label>
                    <InputMask
                      mask='+375 99 999-99-99'
                      alwaysShowMask
                      onChange={checkPhoneValidity}
                      name={'phone'}
                    >
                      {(inputProps) => (
                        <input
                          ref={register({
                            pattern: /^(\+375) (29|25|44|33) (\d{3})-(\d{2})-(\d{2})$/})}
                          name={inputProps.name}
                          {...inputProps}
                        />
                      )}
                    </InputMask>
                  </div>
                  {isIncorrectPhone && <span className='authForm__error'>Wrong format</span>}
                  <div id='recaptcha-container' />
                  <button
                    id='signInWithPhoneNumber'
                    name='getCodeBtn'
                  >
                    Get verification code
                  </button>
                </form>
              </div>
            </>
            : <>
              <div className='authForm__verificationCode-form-box'>
                <div className='authForm__title-box'>
                  <h2 className='authForm__title'>Enter code from SMS</h2>
                </div>
                <form onSubmit={handleSubmit(checkVerificationCode)} className='authForm__verificationCode-form'>
                  <input
                    className='authForm__codeInput'
                    placeholder='XXXXXX'
                    maxLength='6'
                    name='verificationCode'
                    type='text'
                    ref={register({
                      required: true,
                      minLength: 6
                    })}
                    onChange={handleVerificationCodeInput}
                  />
                  <span className='authForm__codeTimer'>Code sent 0:{timer} </span>
                  {errors.verificationCode?.type === 'required' && <span className='authForm__error'>Code not entered</span>}
                  {errors.verificationCode?.type === 'minLength' && <span className='authForm__error'>Code must be 6 characters long</span>}
                  <span className='authForm__error'>{wrongCodeMsg}</span>
                  <button name='confirmPhoneBtn'>Confirm</button>
                  <span className='authForm__changeNumber' onClick={backToPhoneInput}> Change phone number </span>
                </form>
              </div>
            </>
          }
        </div>
      </div>

    </div>
  );
}

export default AuthForm;
