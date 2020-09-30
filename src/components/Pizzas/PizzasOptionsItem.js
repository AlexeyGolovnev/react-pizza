import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

PizzasOptionsItem.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  handlerOptionsSelection: PropTypes.func.isRequired
};

function PizzasOptionsItem ({ isDisabled, isSelected, text, handlerOptionsSelection }) {
  return (
    <input
      className={classNames('pizzas__options-item', {
        disabled: isDisabled,
        selected: isSelected
      })}
      disabled={isDisabled}
      type='button'
      value={text}
      onClick={handlerOptionsSelection}
    />
  );
}

export default PizzasOptionsItem;
