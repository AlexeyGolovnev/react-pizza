import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/pizza-logo.svg';
import Button from '../Button/Button';
import BasketBtn from '../Button/BasketBtn';

function Header () {
  const totalCount = useSelector((state) => state.basket.totalCount);
  const totalPrice = useSelector((state) => state.basket.totalPrice);
  const user = useSelector((state) => state.user);
  return (
    <header className='header'>
      <div className='container'>
        <div className='header__inner'>
          <div className='header__logo-box'>
            <div className='header__logo-img-box'>
              <Link to='/'>
                <img className='header__logo-img' src={logo} alt='logo' />
                <div className='header__logo-text-box'>
                  <h1 className='header__logo-title'>React Pizza</h1>
                  <span className='header__logo-subtitle'>Самая реактивная пицца</span>
                </div>
              </Link>
            </div>
          </div>
          <div className='header__btn-box'>
            <Button
              basket
              path='/basket'
              children={(
                <BasketBtn
                  totalCount={totalCount}
                  totalPrice={totalPrice}
                />
              )}
            />
            <Button
              outline
              path={!user.id ? '/auth' : '/user'}
              children={<span className='button_signIn'> {user.id ? 'Кабинет' : 'Вход'} </span>}
            />
          </div>

        </div>
      </div>
    </header>
  );
}

export default Header;
