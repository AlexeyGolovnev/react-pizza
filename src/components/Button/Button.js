import React from 'react';
import classNames from 'classnames';
import basket from '../assets/img/basket.svg';
import plus from '../assets/img/plus.svg';

function Button(props) {
    return (
       <a href = '#' className={classNames('button', {
           'button_basket':props.basket,
           'button_add':props.add,
       })}>
           {props.children}
       </a>
    );
}

export default Button;


// <div className='basket__button-price'> 500 $ </div>
// <div className='basket__button-count'>
//     {/*<i className="fas fa-plus"></i>*/}
//     <i className="fas fa-shopping-basket"></i>
//     <span> 3 </span>
// </div>