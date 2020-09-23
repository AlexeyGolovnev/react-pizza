import {
    getCategoriesFromApi,
    getDoughTypesFromApi,
    getPizzasFromApi,
    getSizesFromApi,
    getSortCriteriaFromApi
} from "../api/api";
import {
    ADD_PIZZA_TO_BASKET,
    CALCULATE_TOTAL_DATA,
    CHANGE_CATEGORY, CHANGE_SORT_CRITERION, CLEAR_SELECTED_OPTIONS,
    GET_CATEGORIES,
    GET_DOUGH_TYPES,
    GET_PIZZA_SIZES,
    GET_PIZZAS, GET_SORT_CRITERIA,
    SELECT_OPTIONS
} from "./actionTypes";

export const getPizzas = (sortCriteria = {nameField: 'rating', order:'DESC'}) => {
    return function (dispatch) {
        getPizzasFromApi(sortCriteria)
            .then(response => {
                dispatch({
                    type: GET_PIZZAS,
                    pizzas: response.data,
                })
            });
    }
}

export const getDoughTypes = () => {
    return function (dispatch) {
        getDoughTypesFromApi()
            .then(response => {
                dispatch({
                    type: GET_DOUGH_TYPES,
                    doughTypes: response.data,
                })
            });
    }
}

export const getPizzaSizes = () => {
    return function (dispatch) {
        getSizesFromApi()
            .then(response => {
                dispatch({
                    type: GET_PIZZA_SIZES,
                    pizzaSizes: response.data,
                })
            });
    }
}

export const getCategories = () => {
    return function (dispatch) {
        getCategoriesFromApi()
            .then(response => {
                dispatch({
                    type: GET_CATEGORIES,
                    categories: response.data,
                })
            });
    }
}

export const getSortCriteria = () => {
    return function (dispatch) {
        getSortCriteriaFromApi()
            .then(response => {
                dispatch({
                    type: GET_SORT_CRITERIA,
                    sortCriteria: response.data,
                })
            });
    }
}

export const selectOptions = (pizzaId, doughId, sizeId) => {
    return {
        type: SELECT_OPTIONS,
        payload: {
            pizzaId: pizzaId,
            doughId: doughId,
            sizeId: sizeId
        }
    }
}
export const clearSelectedOptions = () => {
    return {
        type: CLEAR_SELECTED_OPTIONS,
    }
}

export const changeCategory = (categoryId) => {
    return {
        type: CHANGE_CATEGORY,
        categoryId: categoryId,
    }
}

export const changeSortCriterion = (sortCriterionId) => {
    return {
        type: CHANGE_SORT_CRITERION,
        sortCriterionId: sortCriterionId,
    }
}

export const addPizzaToBasket = (pizzaId, doughId, sizeId, pizzasCount, price) => {
    return {
        type: ADD_PIZZA_TO_BASKET,
        payload: {
            pizzaId: pizzaId,
            doughId: doughId,
            sizeId: sizeId,
            pizzasCount: pizzasCount,
            price: price,
        }
    }
}

export const calculateTotalData = () => {
    return {
        type: CALCULATE_TOTAL_DATA,
    }
}