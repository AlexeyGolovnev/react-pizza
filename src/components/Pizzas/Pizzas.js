import React, {useContext, useEffect, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {DispatchContext} from '../../context';
import { createSelector } from 'reselect';
import PizzasItem from './PizzasItem';
import {
  clearSelectedOptions,
  getDoughTypes,
  getPizzas,
  getPizzaSizes
} from '../../redux/action';

function Pizzas () {
  const { dispatch } = useContext(DispatchContext);

  useEffect(() => {
    dispatch(clearSelectedOptions());
    dispatch(getPizzas(currentSortCriterion));
    dispatch(getDoughTypes());
    dispatch(getPizzaSizes());
  }, []);

  const currentCategoryId = useSelector((state) => state.filters.currentCategory);
  const currentSortCriterionId = useSelector((state) => state.filters.currentSortCriterion);

  const currentCategory = createSelector(
    (state) => state.filters.categories,
    (categories) => categories.find((category) => category.id === currentCategoryId));

  const currentSortCriterionObj = createSelector(
    (state) => state.filters.sortCriteria,
    (sortCriteria) => sortCriteria.find(
      (sortCriterion) => sortCriterion.id === currentSortCriterionId));
  const currentSortCriterion = useSelector(currentSortCriterionObj);

  useEffect(() => {
    dispatch(getPizzas(currentSortCriterion));
  }, [currentSortCriterion]);

  const filteredPizzas = createSelector(
    (state) => state.pizzas.pizzas,
    (pizzas) => pizzas.filter((pizza) => pizza.category.includes(currentCategoryId)));
  const pizzas = useSelector(filteredPizzas);
  const category = useSelector(currentCategory);

  const pizzasJsx = useMemo(() => pizzas.map((pizza) => (
    <PizzasItem
      key={pizza.id}
      pizzaId={pizza.id}
      {...pizza}
      currentCategoryId={currentCategoryId}
      currentSortCriterionId={currentSortCriterionId}
    />
  )), [pizzas]);

  return (
    <div className='pizzas'>
      <div className='container'>
        <div className='pizzas__inner'>
          <h2>
            {category && `${category.name} пиццы`}
          </h2>
          <div className='pizzas__items-box'>{pizzasJsx}</div>
        </div>
      </div>
    </div>
  );
}

export default Pizzas;
