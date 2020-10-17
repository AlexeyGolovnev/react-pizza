import React, {useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import {useSelector} from 'react-redux';
import Button from '../Button/Button';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import OrderModal from './OrderModal/OrderModal';
import {useHistory} from 'react-router';

function OrderForm () {
  const { register, handleSubmit, setValue } = useForm();
  const history = useHistory();
  const user = useSelector(state => state.user);
  const [hasOrdered, setHasOrdered] = useState(false);

  useEffect(() => {
    if (!user.id) { history.push('/auth'); }
  }, [user]);
  const order = (formData) => {
    setHasOrdered(true);
  };
  const substitution = () => {
    setValue('street', user.street);
    setValue('house', user.house);
    setValue('entrance', user.entrance);
    setValue('floor', user.floor);
    setValue('apartment', user.apartment);
    setValue('name', user.name);
    setValue('phone', user.phone);
  };
  return (
    <div className='order'>
      <div className='container'>
        <div className='order__inner'>
          <div className='order__header'>
            <span className='order__title'>Куда доставить?</span>
            <span className='order__substitution' onClick={substitution}>Подставить данные из профиля</span>
          </div>
          <form className='order__form' onSubmit={handleSubmit(order)}>
            <input name='street' placeholder='Улица' ref={register} />
            <input name='house' placeholder='Дом' ref={register} />
            <input name='entrance' placeholder='Подъезд' ref={register} />
            <input name='floor' placeholder='Этаж' ref={register} />
            <input name='apartment' placeholder='Квартира' ref={register} />
            <input name='name' placeholder='Имя' ref={register} />
            <input name='phone' placeholder='Телефон' ref={register} />
            <textarea name='comment' placeholder='Комментарий' ref={register} rows='3' />
            <div>
              <Button outline path='/basket' classes='button_back qwe'>
                <FontAwesomeIcon icon={faArrowLeft} />
                <span>Вернуться в корзину</span>
              </Button>
              <button name='submitBtn' type='submit'>Подтвердить адрес</button>
            </div>
          </form>
          { hasOrdered ? <OrderModal closeModal={() => setHasOrdered(false)} /> : '' }
        </div>
      </div>
    </div>
  );
}

export default OrderForm;
