import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

AddBtn.propTypes = {
  currentCount: PropTypes.number.isRequired,
  classes: PropTypes.any
};
function AddBtn ({ currentCount, classes }) {
  return (
    <>
      <FontAwesomeIcon icon={faPlus} className='icon' />
      <span>Добавить</span>
      <span className={classNames('pizza-count', classes, {})}>{currentCount}</span>
    </>
  );
}

export default AddBtn;
