import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';

BasketBtn.propTypes = {
  totalCount: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired
};

function BasketBtn ({ totalCount, totalPrice }) {
  return (
    <>
      <span className='total-price'>{ totalPrice } $</span>
      <span className='delimiter'> </span>
      <span className='total-count'>
        <FontAwesomeIcon icon={faShoppingBasket} className='icon' />
        <span>{ totalCount }</span>
      </span>
    </>
  );
}

export default BasketBtn;
