import React from 'react';

function BasketBtn({totalCount, totalPrice}) {
    return (
        <>
            <span className='total-price'>{totalPrice} руб.</span>
            <span className='delimiter'> </span>
            <span className='total-count'>
                <i className="fas fa-shopping-basket"></i>
                <span>{totalCount}</span>
            </span>
        </>
    );
}

export default BasketBtn;