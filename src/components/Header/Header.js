import React from 'react';
import logo from '../../assets/img/pizza-logo.svg';
import Button from "../Button/Button";
import BasketBtn from "../Button/BasketBtn";
import {useSelector} from "react-redux";

function Header() {

    const totalCount = useSelector(state => state.basket.totalCount);
    const totalPrice = useSelector(state => state.basket.totalPrice);

    return (
        <header className='header'>
            <div className="container">
                <div className="header__inner">
                    <div className='header__logo-box'>
                        <div className="header__logo-img-box">
                            <img className='header__logo-img' src={logo} alt='logo'/>
                            <div className='header__logo-text-box'>
                                <h1 className='header__logo-title'>React Pizza</h1>
                                <span className='header__logo-subtitle'>Самая вкусная пицца во вселенной</span>
                            </div>
                        </div>
                    </div>
                    <Button
                        basket
                        children={
                            <BasketBtn
                                totalCount={totalCount}
                                totalPrice={totalPrice}
                            />
                        }/>
                </div>
            </div>
        </header>
    );
}

export default Header;