import React, {useContext, useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';

import firebase from 'firebase';
import { firebaseDb } from '../../firebase';
import { useHistory } from 'react-router';
import { getUserProfile } from '../../redux/action';
import { DispatchContext } from '../../context';
import { useSelector } from 'react-redux';

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
      setWrongCodeMsg('Введенный код не действителен');
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
          setErrorMsg('Срок действия капчи истек');
        }
      });
    } catch (error) {
      setErrorMsg('Превышен лимит запросов. Повторите попытку позже');
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
        .catch(error => error && setErrorMsg('Превышен лимит запросов. Повторите попытку позже'));
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
                  <h2 className='authForm__title'>Вход в личный кабинет</h2>
                  <span>{errorMsg}</span>
                </div>
                <form onSubmit={handleSubmit(sendCodeToPhone)} className='authForm__phone-form'>
                  <div>
                    <label htmlFor='phone'>Номер телефона</label>
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
                  {isIncorrectPhone && <span className='authForm__error'>Неверный формат</span>}
                  <div id='recaptcha-container' />
                  <button
                    id='signInWithPhoneNumber'
                    name='getCodeBtn'
                  >
                    Получить код
                  </button>
                </form>
              </div>
            </>
            : <>
              <div className='authForm__verificationCode-form-box'>
                <div className='authForm__title-box'>
                  <h2 className='authForm__title'>Введите код из смс</h2>
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
                  <span className='authForm__codeTimer'>Код отправлен 0:{timer} </span>
                  {errors.verificationCode?.type === 'required' && <span className='authForm__error'>Код не введен</span>}
                  {errors.verificationCode?.type === 'minLength' && <span className='authForm__error'>Код должен содержать 6 цифр</span>}
                  <span className='authForm__error'>{wrongCodeMsg}</span>
                  <button name='confirmPhoneBtn'>Подтвердить</button>
                  <span className='authForm__changeNumber' onClick={backToPhoneInput}> Изменить номер телефона </span>
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
