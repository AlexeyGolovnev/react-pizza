import React, {useContext, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router';
import {DispatchContext} from '../../context';
import {getUserProfile, saveUserProfile, signOut} from '../../redux/action';
import Button from '../Button/Button';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';

function UserProfile () {
  const { dispatch } = useContext(DispatchContext);
  const history = useHistory();
  const user = useSelector(state => state.user && state.user);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      street: user.street,
      house: user.house,
      entrance: user.entrance,
      floor: user.floor,
      apartment: user.apartment,
      name: user.name,
      phone: user.phone
    }
  });
  useEffect(() => {
    if (!user.id) {
      history.push('/auth');
    }
  }, [user]);

  const saveUserData = (formData) => {
    dispatch(saveUserProfile(user.id, {...formData, phone: user.phone}));
    dispatch(getUserProfile(user.id));
  };

  return (
    <div className='user-profile'>
      <div className='user-profile__inner'>
        <span className='user-profile__title'>Профиль</span>
        <span className='user-profile__subtitle'>Личные данные</span>
        <form className='user-profile__form' onSubmit={handleSubmit(saveUserData)} >
          <div>
            <label htmlFor='name'>Имя</label>
            <input name='name' placeholder='' ref={register} />
          </div>
          <div>
            <label htmlFor='phone'>Телефон</label>
            <input disabled name='phone' placeholder='' ref={register} />
          </div>
          <div>
            <label htmlFor='street'>Улица</label>
            <input name='street' placeholder='' ref={register} />
          </div>
          <div>
            <label htmlFor='house'>Дом</label>
            <input name='house' placeholder='' ref={register} />
          </div>
          <div>
            <label htmlFor='entrance'>Подъезд</label>
            <input name='entrance' placeholder='' ref={register} />
          </div>
          <div>
            <label htmlFor='floor'>Этаж</label>
            <input name='floor' placeholder='' ref={register} />
          </div>
          <div>
            <label htmlFor='apartment'>Квартира</label>
            <input name='apartment' placeholder='' ref={register} />
          </div>
          <div className='user-profile__btn-box'>
            <Button outline path='/user' classes='button_back qwe' action={() => dispatch(signOut())}>
              <FontAwesomeIcon icon={faArrowLeft} />
              <span>Выход</span>
            </Button>
            <button name='save'>Сохранить</button>
          </div>

        </form>

      </div>
    </div>

  );
}

export default UserProfile;
