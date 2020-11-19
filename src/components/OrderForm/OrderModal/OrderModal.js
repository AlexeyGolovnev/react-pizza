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
          <span className='order__modal-title'>Thank you for your order!</span>
          <span className='order__modal-close' onClick={closeModal}>&times;</span>
        </div>
        <div className='order__modal-body' >
          <span className='order__modal-msg'>Our operator will contact you to clarify the data</span>
        </div>
      </div>
    </div>
  );
}

export default OrderModal;
