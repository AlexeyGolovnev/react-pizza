import {
  getCollectionFromFirebase,
  getPizzasFromFirebase, getUserProfileFromFirebase, updateUserProfileInFirebase
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
  GET_SORT_CRITERIA, GET_USER_PROFILE, SAVE_USER_PROFILE,
  SELECT_OPTIONS, SIGN_OUT
} from './actionTypes';

export const getPizzas = (categoryId = 0, currentSortCriterion = { nameField: 'rating' }) =>
  async function (dispatch) {
    await getPizzasFromFirebase('pizzas', categoryId, currentSortCriterion)
      .then((snapshot) => {
        dispatch({
          type: GET_PIZZAS,
          pizzas: snapshot.docs
        });
      });
  };

export const getDoughTypes = () =>
  async function (dispatch) {
    await getCollectionFromFirebase('doughTypes')
      .then((snapshot) => {
        dispatch({
          type: GET_DOUGH_TYPES,
          doughTypes: snapshot.docs
        });
      });
  };

export const getPizzaSizes = () =>
  async function (dispatch) {
    await getCollectionFromFirebase('pizzaSizes')
      .then((snapshot) => {
        dispatch({
          type: GET_PIZZA_SIZES,
          pizzaSizes: snapshot.docs
        });
      });
  };

export const getCategories = () =>
  async function (dispatch) {
    await getCollectionFromFirebase('categories')
      .then((snapshot) => {
        dispatch({
          type: GET_CATEGORIES,
          categories: snapshot.docs
        });
      });
  };

export const getSortCriteria = () =>
  async function (dispatch) {
    await getCollectionFromFirebase('sortCriteria')
      .then((snapshot) => {
        dispatch({
          type: GET_SORT_CRITERIA,
          sortCriteria: snapshot.docs
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

export const getUserProfile = (userId) =>
  async function (dispatch) {
    await getUserProfileFromFirebase(userId).then(doc => {
      if (doc.exists) {
        dispatch({
          type: GET_USER_PROFILE,
          user: { id: userId, ...doc.data() }
        });
      }
    });
  };
export const saveUserProfile = (userId, newUserProfile) =>
  async function (dispatch) {
    await updateUserProfileInFirebase(userId, newUserProfile)
      .then(() => {
        dispatch({
          type: SAVE_USER_PROFILE
        });
      });
  };

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};
