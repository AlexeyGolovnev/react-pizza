import React, {useContext, useEffect, useMemo} from 'react';
import PizzasItem from './PizzasItem';
import { useSelector } from 'react-redux';
import { DispatchContext } from '../../context';
import { createSelector } from 'reselect';
import { PizzaItemLoader } from '../Loaders/PizzaItemLoader';
import {
  clearSelectedOptions,
  getDoughTypes,
  getPizzas,
  getPizzaSizes
} from '../../redux/action';
import { RectangleLoader } from '../Loaders/RectangleLoader';

function Pizzas () {
  const { dispatch } = useContext(DispatchContext);
  useEffect(() => {
    dispatch(clearSelectedOptions());
    dispatch(getPizzas(currentCategoryId, currentSortCriterion));
    dispatch(getDoughTypes());
    dispatch(getPizzaSizes());
  }, []);

  const currentCategoryId = useSelector((state) => state.filters.currentCategory);
  const currentSortCriterionId = useSelector((state) => state.filters.currentSortCriterion);

  const currentCategoryObj = createSelector(
    (state) => state.filters.categories,
    (categories) => categories.find((category) => category.id === currentCategoryId));

  const currentSortCriterionObj = createSelector(
    (state) => state.filters.sortCriteria,
    (sortCriteria) => sortCriteria.find((sortCriterion) => sortCriterion.id === currentSortCriterionId));

  const currentSortCriterion = useSelector(currentSortCriterionObj);
  const currentCategory = useSelector(currentCategoryObj);
  const pizzas = useSelector(state => state.pizzas.pizzas);
  
  useEffect(() => {
    dispatch(getPizzas(currentCategoryId, currentSortCriterion));
  }, [currentCategoryId, currentSortCriterion]);

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
          {pizzasJsx.length
            ? <h2>{currentCategory && `${currentCategory.name} пиццы`}</h2>
            : <RectangleLoader />
          }
          <div className='pizzas__items-box'>
            {pizzasJsx.length
              ? pizzasJsx
              : (<> <PizzaItemLoader /> <PizzaItemLoader /> <PizzaItemLoader /> </>)
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pizzas;
