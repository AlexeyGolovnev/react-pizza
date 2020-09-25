import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons'

function BasketBtn({totalCount, totalPrice}) {

    return (
        <>
            <span className='total-price'>{totalPrice} руб.</span>
            <span className='delimiter'> </span>
            <span className='total-count'>
                <FontAwesomeIcon icon={faShoppingBasket} className='icon' />
                <span>{totalCount}</span>
            </span>
        </>
    );
}

export default BasketBtn;