import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'

function AddBtn({currentCount, classes}) {
    return (
        <>
           <FontAwesomeIcon icon={faPlus} className='icon' />
            <span>Добавить</span>
            <span className={classNames('pizza-count',classes,{})}>{currentCount}</span>
        </>
    );
}

export default AddBtn;