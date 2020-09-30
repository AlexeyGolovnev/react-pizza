import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

CategoryItem.propTypes = {
  name: PropTypes.string.isRequired,
  selectCategory: PropTypes.func.isRequired,
  classes: PropTypes.any
};
function CategoryItem ({ name, selectCategory, classes }) {
  return (
    <span
      className={classNames('categories__item', classes, {})}
      onClick={selectCategory}
    >
      {name}
    </span>
  );
}

export default CategoryItem;
