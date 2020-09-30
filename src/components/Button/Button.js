import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

Button.propTypes = {
  basket: PropTypes.bool,
  outline: PropTypes.bool,
  back: PropTypes.bool,
  children: PropTypes.node.isRequired,
  action: PropTypes.func,
  classes: PropTypes.any
};

function Button ({ basket, outline, children, action, classes, back }) {
  return (
    <Link
      to={back ? '/' : '/basket'}
      className={classNames('button', classes, {
        button_basket: basket,
        button_add: outline
      })}
      onClick={action}
    >
      {children}
    </Link>
  );
}

export default Button;
