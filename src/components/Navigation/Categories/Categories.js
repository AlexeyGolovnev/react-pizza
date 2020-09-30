import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import CategoryItem from './CategoryItem';
import { changeCategory, clearSelectedOptions } from '../../../redux/action';
import {DispatchContext} from '../../../context';

Categories.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentCategoryId: PropTypes.number.isRequired
};

function Categories ({ categories, currentCategoryId }) {
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
      {categoriesJsx}
    </div>
  );
}

export default Categories;
