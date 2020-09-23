import React from 'react';
import classNames from 'classnames';

function PizzasOptionsItem({isDisabled,isSelected,text,handlerOptionsSelection}) {
    return (
        <input
            className={classNames('pizzas__options-item', {
                'disabled': isDisabled,
                'selected': isSelected,
            })}
            disabled={isDisabled}
            type='button'
            value={text}
            onClick={handlerOptionsSelection}
        />
    );
}

export default PizzasOptionsItem;