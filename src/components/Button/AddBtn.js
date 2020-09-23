import React from 'react';
import classNames from 'classnames';

function AddBtn({currentCount, classes}) {
    return (
        <>
            <i className="fas fa-plus"></i>
            <span>Добавить</span>
            <span className={classNames('pizza-count',classes,{})}>{currentCount}</span>
        </>
    );
}

export default AddBtn;