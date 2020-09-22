import {GET_CATEGORIES, GET_DOUGH_TYPES, GET_PIZZA_SIZES, GET_PIZZAS} from "./actionTypes";

const initialState = {
    pizzas:[],
    doughTypes:[],
    pizzaSizes: [],
    categories: [],
}

export const pizzasReducer = (state= initialState, action) => {
    switch (action.type) {
        case GET_PIZZAS: {
            return {
                ...state,
                pizzas: action.pizzas,
            }
        }
        case GET_DOUGH_TYPES: {
            return {
                ...state,
                doughTypes: action.doughTypes,
            }
        }
        case GET_PIZZA_SIZES: {
            return {
                ...state,
                pizzaSizes: action.pizzaSizes,
            }
        }
        case GET_CATEGORIES: {
            return {
                ...state,
                categories: action.categories,
            }
        }

        default:
            return state;
    }
}