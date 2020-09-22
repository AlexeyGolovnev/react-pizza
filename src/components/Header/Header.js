import React from 'react';
import logo from './../assets/img/pizza-logo.svg';
import HeaderBtn from "./HeaderBtn";

function Header(props) {
    return (
        <header className='header'>
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
                <HeaderBtn/>
            </div>
        </header>
    );
}

export default Header;