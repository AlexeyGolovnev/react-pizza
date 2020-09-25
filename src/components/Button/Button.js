import React from 'react';
import classNames from 'classnames';
import {Link} from "react-router-dom";


function Button({basket, outline, children, action, classes ,back}) {
    return (
        <Link
            to = {back ? '/':'/basket'}
            className={classNames('button', classes,{
                'button_basket': basket,
                'button_add': outline,
            })}
            onClick={action}
        >
            {children}
        </Link>
    );
}

export default Button;