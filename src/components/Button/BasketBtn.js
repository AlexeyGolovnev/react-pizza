import React from 'react';

function BasketBtn(props) {
    return (
        <>
            <span className='total-price'>520 $</span>
            <span className='total-count'>
                <i className="fas fa-shopping-basket"></i>
                <span>3</span>
            </span>
        </>
    );
}

export default BasketBtn;