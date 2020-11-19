import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import CategoryItem from './CategoryItem';
import { changeCategory, clearSelectedOptions } from '../../../redux/action';
import { DispatchContext } from '../../../context';
import { RectangleLoader } from '../../Loaders/RectangleLoader';

Categories.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentCategoryId: PropTypes.number.isRequired,
  pizzasCount: PropTypes.number.isRequired
};

function Categories ({ categories, currentCategoryId, pizzasCount }) {
  const { dispatch } = useContext(DispatchContext);

  const selectCategory = (categoryId) => {
    if (currentCategoryId !== categoryId) {
      dispatch(changeCategory(categoryId));
      dispatch(clearSelectedOptions());
    }
  };
  const categoriesJsx = categories.map((category) => (
    <CategoryItem
      key={category.id}
      classes={currentCategoryId === category.id && 'current'}
      name={category.name}
      selectCategory={() => selectCategory(category.id)}
      currentCategory={currentCategoryId}
    />
  ));
  return (
    <div className='categories'>
      {pizzasCount > 0
        ? categoriesJsx
        : <>
          <RectangleLoader />
          <RectangleLoader />
          <RectangleLoader />
          <RectangleLoader />
        </>
      }
    </div>
  );
}

export default Categories;
