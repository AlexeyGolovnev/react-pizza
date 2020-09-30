import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';

ShoppingBasketItem.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  dough: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  addPizza: PropTypes.func.isRequired,
  deleteOnePizza: PropTypes.func.isRequired,
  deletePizzas: PropTypes.func.isRequired
};

function ShoppingBasketItem ({ img, name, dough, size, count, price, addPizza, deleteOnePizza, deletePizzas }) {
  return (
    <li className='basket__item'>
      <div className='basket__item-img-option-box'>
        <div className='basket__item-img-box'>
          <img className='basket__item-img' src={img} alt=' ' />
        </div>
        <div className='basket__item-option-box'>
          <span className='basket__item-name'>{name}</span>
          <span className='basket__item-option'>{dough} тесто, {size} см.</span>
        </div>
      </div>

      <div className='basket__item-count-box'>
        <FontAwesomeIcon icon={faMinus} className='basket__item-icon' onClick={deleteOnePizza} />
        <span className='basket__item-count'>{count}</span>
        <FontAwesomeIcon icon={faPlus} className='basket__item-icon' onClick={addPizza} />
      </div>
      <span className='basket__item-price'>{price} руб.</span>
      <FontAwesomeIcon icon={faTimesCircle} className='basket__item-icon times' onClick={deletePizzas} />
    </li>
  );
}

export default ShoppingBasketItem;
