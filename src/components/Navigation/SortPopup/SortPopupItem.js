import React from 'react';

function SortPopupItem({text,changeCategory}) {
    return (
        <li onClick={changeCategory} className="sort__popup-item"> {text} </li>
    );
}

export default SortPopupItem;