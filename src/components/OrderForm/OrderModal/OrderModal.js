import React from 'react';
import PropTypes from 'prop-types';

OrderModal.propTypes = {
  closeModal: PropTypes.func
};
function OrderModal ({ closeModal }) {
  return (
    <div className='order__modal-overlay'>
      <div className='order__modal-window'>
        <div className='order__modal-header'>
          <span className='order__modal-title'>Спасибо за ваш заказ!</span>
          <span className='order__modal-close' onClick={closeModal}>&times;</span>
        </div>
        <div className='order__modal-body' >
          <span className='order__modal-msg'>Наш оператор свяжется с вами для уточнения данных</span>
        </div>
      </div>
    </div>
  );
}

export default OrderModal;
