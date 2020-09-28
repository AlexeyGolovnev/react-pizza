import React, { useEffect } from "react";
import PizzasItem from "./PizzasItem";
import {
  clearSelectedOptions,
  getDoughTypes,
  getPizzas,
  getPizzaSizes,
} from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

function Pizzas() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearSelectedOptions());
    dispatch(getPizzas(currentSortCriterion));
    dispatch(getDoughTypes());
    dispatch(getPizzaSizes());
  }, []);

  const currentCategoryId = useSelector(
    (state) => state.pizzas.currentCategory
  );
  const currentSortCriterionId = useSelector(
    (state) => state.pizzas.currentSortCriterion
  );

  const currentCategory = createSelector(
    (state) => state.pizzas.categories,
    (categories) =>
      categories.find((category) => category.id === currentCategoryId)
  );

  const currentSortCriterionObj = createSelector(
    (state) => state.pizzas.sortCriteria,
    (sortCriteria) =>
      sortCriteria.find(
        (sortCriterion) => sortCriterion.id === currentSortCriterionId
      )
  );
  const currentSortCriterion = useSelector(currentSortCriterionObj);
  useEffect(() => {
    dispatch(getPizzas(currentSortCriterion));
  }, [currentSortCriterion]);

  const filteredPizzas = createSelector(
    (state) => state.pizzas.pizzas,
    (pizzas) =>
      pizzas.filter((pizza) => pizza.category.includes(currentCategoryId))
  );
  const pizzas = useSelector(filteredPizzas);
  const category = useSelector(currentCategory);

  const pizzasJsx = pizzas.map((pizza) => {
    return (
      <PizzasItem
        key={pizza.id}
        pizzaId={pizza.id}
        imageUrl={pizza.imageUrl}
        name={pizza.name}
        doughs={pizza.doughs}
        sizes={pizza.sizes}
        price={pizza.price}
        category={pizza.category}
        rating={pizza.rating}
        dispatch={dispatch}
        currentCategory={currentCategoryId}
        currentSortCriterion={currentSortCriterionId}
      />
    );
  });

  return (
    <div className="pizzas">
      <div className="container">
        <div className="pizzas__inner">
          <h2>{category && category.name + " пиццы"} </h2>
          <div className="pizzas__items-box">{pizzasJsx}</div>
        </div>
      </div>
    </div>
  );
}

export default Pizzas;
