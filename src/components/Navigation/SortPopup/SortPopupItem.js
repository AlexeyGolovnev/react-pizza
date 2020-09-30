import React from 'react';
import PropTypes from 'prop-types';

SortPopupItem.propTypes = {
  text: PropTypes.string.isRequired,
  changeCategory: PropTypes.func.isRequired
};
function SortPopupItem ({ text, changeCategory }) {
  return (
    <li onClick={changeCategory} className='sort__popup-item'>{text}</li>
  );
}

export default SortPopupItem;
