import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMinus, faPlus} from '@fortawesome/free-solid-svg-icons'
import {faTimesCircle} from '@fortawesome/free-regular-svg-icons'

function ShoppingBasketItem({img,name,dough,size,count,price, onAddPizza,onDeleteOnePizza,onDeletePizza}) {
    return (
        <li className='basket__item'>
            <div className='basket__item-img-option-box'>
                <div className='basket__item-img-box'>
                    <img className='basket__item-img' src= {img} />
                </div>
                <div className="basket__item-option-box">
                    <span className='basket__item-name'>{name}</span>
                    <span className='basket__item-option'>{dough} тесто, {size} см.</span>
                </div>
            </div>

            <div className="basket__item-count-box">
                <FontAwesomeIcon icon={faMinus} className='basket__item-icon' onClick={onDeleteOnePizza}/>
                <span className='basket__item-count'> {count} </span>
                <FontAwesomeIcon icon={faPlus} className='basket__item-icon' onClick={onAddPizza}/>
            </div>
            <span className='basket__item-price'> {price} руб.</span>
            <FontAwesomeIcon icon={faTimesCircle} className='basket__item-icon times' onClick = {onDeletePizza}/>
        </li>
    );
}

export default ShoppingBasketItem;