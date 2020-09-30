import {
  getCategoriesFromApi,
  getDoughTypesFromApi,
  getPizzasFromApi,
  getSizesFromApi,
  getSortCriteriaFromApi
} from '../api/api';
import {
  ADD_PIZZA_TO_BASKET,
  CALCULATE_TOTAL_DATA,
  CHANGE_CATEGORY,
  CHANGE_SORT_CRITERION,
  CLEAR_BASKET,
  CLEAR_SELECTED_OPTIONS,
  DELETE_ONE_PIZZA_FROM_BASKET,
  DELETE_PIZZA_FROM_BASKET,
  GET_CATEGORIES,
  GET_DOUGH_TYPES,
  GET_PIZZA_SIZES,
  GET_PIZZAS,
  GET_SORT_CRITERIA,
  SELECT_OPTIONS
} from './actionTypes';

export const getPizzas = (sortCriterion = { nameField: 'rating', order: 'DESC' }) =>
  async function (dispatch) {
    await getPizzasFromApi(sortCriterion).then((response) => {
      dispatch({
        type: GET_PIZZAS,
        pizzas: response.data
      });
    });
  };

export const getDoughTypes = () =>
  async function (dispatch) {
    await getDoughTypesFromApi().then((response) => {
      dispatch({
        type: GET_DOUGH_TYPES,
        doughTypes: response.data
      });
    });
  };

export const getPizzaSizes = () =>
  async function (dispatch) {
    await getSizesFromApi().then((response) => {
      dispatch({
        type: GET_PIZZA_SIZES,
        pizzaSizes: response.data
      });
    });
  };

export const getCategories = () =>
  async function (dispatch) {
    await getCategoriesFromApi().then((response) => {
      dispatch({
        type: GET_CATEGORIES,
        categories: response.data
      });
    });
  };

export const getSortCriteria = () =>
  async function (dispatch) {
    await getSortCriteriaFromApi().then((response) => {
      dispatch({
        type: GET_SORT_CRITERIA,
        sortCriteria: response.data
      });
    });
  };

export const selectOptions = (pizzaId, doughId, sizeId) => ({
  type: SELECT_OPTIONS,
  payload: {
    pizzaId,
    doughId,
    sizeId
  }
});

export const clearSelectedOptions = () => ({
  type: CLEAR_SELECTED_OPTIONS
});

export const changeCategory = (categoryId) => ({
  type: CHANGE_CATEGORY,
  categoryId
});

export const changeSortCriterion = (sortCriterionId) => ({
  type: CHANGE_SORT_CRITERION,
  sortCriterionId
});

export const addPizzaToBasket = (pizzaId, doughId, sizeId, pizzasCount, price) => ({
  type: ADD_PIZZA_TO_BASKET,
  payload: {
    pizzaId,
    doughId,
    sizeId,
    pizzasCount,
    price
  }
});

export const deleteOnePizzaFromBasket = (pizzaId, doughId, sizeId) => ({
  type: DELETE_ONE_PIZZA_FROM_BASKET,
  payload: {
    pizzaId,
    doughId,
    sizeId
  }
});

export const clearBasket = () => ({
  type: CLEAR_BASKET
});

export const deletePizzaFromBasket = (pizzaId, doughId, sizeId) => ({
  type: DELETE_PIZZA_FROM_BASKET,
  payload: {
    pizzaId,
    doughId,
    sizeId
  }
});

export const calculateTotalData = () => ({
  type: CALCULATE_TOTAL_DATA
});
