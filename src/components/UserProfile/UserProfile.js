import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { DispatchContext } from '../../context';
import { getUserProfile, saveUserProfile, signOut } from '../../redux/action';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button/Button';

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
        <span className='user-profile__title'>Profile</span>
        <span className='user-profile__subtitle'>User profile</span>
        <form className='user-profile__form' onSubmit={handleSubmit(saveUserData)} >
          <div>
            <label htmlFor='name'>Name</label>
            <input name='name' placeholder='' ref={register} />
          </div>
          <div>
            <label htmlFor='phone'>Phone</label>
            <input disabled name='phone' placeholder='' ref={register} />
          </div>
          <div>
            <label htmlFor='street'>Street</label>
            <input name='street' placeholder='' ref={register} />
          </div>
          <div>
            <label htmlFor='house'>House</label>
            <input name='house' placeholder='' ref={register} />
          </div>
          <div>
            <label htmlFor='entrance'>Entrance</label>
            <input name='entrance' placeholder='' ref={register} />
          </div>
          <div>
            <label htmlFor='floor'>Floor</label>
            <input name='floor' placeholder='' ref={register} />
          </div>
          <div>
            <label htmlFor='apartment'>Apartment</label>
            <input name='apartment' placeholder='' ref={register} />
          </div>
          <div className='user-profile__btn-box'>
            <Button outline path='/user' classes='button_back' action={() => dispatch(signOut())}>
              <FontAwesomeIcon icon={faArrowLeft} />
              <span>Log out</span>
            </Button>
            <button name='save'>Save</button>
  
          </div>

        </form>

      </div>
    </div>

  );
}

export default UserProfile;
