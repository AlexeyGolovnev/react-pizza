import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

Button.propTypes = {
  basket: PropTypes.bool,
  outline: PropTypes.bool,
  path: PropTypes.string,
  children: PropTypes.node.isRequired,
  action: PropTypes.func,
  classes: PropTypes.any
};

function Button ({ path, cart, outline, children, action, classes }) {
  return (
    <Link
      to={path || '/'}
      className={classNames('button', classes, {
        button_basket: cart,
        button_add: outline
      })}
      onClick={action}
    >
      {children}
    </Link>
  );
}

export default Button;
