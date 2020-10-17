import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

Button.propTypes = {
  basket: PropTypes.bool,
  outline: PropTypes.bool,
  path: PropTypes.string,
  children: PropTypes.node.isRequired,
  action: PropTypes.func,
  classes: PropTypes.any
};

function Button ({ path, basket, outline, children, action, classes }) {
  return (
    <Link
      to={path || '/'}
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
