import React from 'react';
import classNames from 'classnames';

function CategoryItem({name, selectCategory,classes}) {

    return (
        <span
            className={classNames('categories__item',classes,{})}
            onClick={selectCategory}
        >
            {name}
        </span>
    );
}

export default CategoryItem;