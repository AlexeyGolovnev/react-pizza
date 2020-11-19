import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, getSortCriteria } from '../../redux/action';
import SortPopup from './SortPopup/SortPopup';
import Categories from './Categories/Categories';

function Navigation () {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getSortCriteria());
  }, []);

  const categories = useSelector((state) => state.filters.categories);
  const currentCategory = useSelector((state) => state.filters.currentCategory);
  const currentSortCriterion = useSelector((state) => state.filters.currentSortCriterion);
  const sortCriteria = useSelector((state) => state.filters.sortCriteria);
  const pizzasCount = useSelector((state) => state.pizzas.pizzas.length);
  return (
    <div className='navigation'>
      <div className='container'>
        <div className='navigation__inner'>
          <Categories
            categories={categories}
            currentCategoryId={currentCategory}
            pizzasCount={pizzasCount}
          />
          <SortPopup
            sortCriteria={sortCriteria}
            currentSortCriterionId={currentSortCriterion}
            pizzasCount={pizzasCount}
          />
        </div>
      </div>
    </div>
  );
}

export default Navigation;
