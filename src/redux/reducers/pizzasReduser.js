import {
    CHANGE_CATEGORY, CHANGE_SORT_CRITERION, CLEAR_SELECTED_OPTIONS,
    GET_CATEGORIES,
    GET_DOUGH_TYPES,
    GET_PIZZA_SIZES,
    GET_PIZZAS, GET_SORT_CRITERIA,
    SELECT_OPTIONS
} from "../actionTypes";

const initialState = {
    pizzas: [],
    doughTypes: [],
    pizzaSizes: [],
    categories: [],
    sortCriteria: [],
    currentCategory: 0,
    currentSortCriterion: 1,
    selectedOptions: []

}


export const pizzasReducer = (state = initialState, action) => {
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
        case GET_SORT_CRITERIA: {
            return {
                ...state,
                sortCriteria: action.sortCriteria,
            }
        }
        case SELECT_OPTIONS: {
            let currentPrice = 0;
            if (action.payload.sizeId) {
                state.pizzas.map(pizza => {
                    if (pizza.id === action.payload.pizzaId) currentPrice = pizza.price;
                })
                state.pizzaSizes.map(size => {
                    if (action.payload.sizeId === size.id)
                        currentPrice += (currentPrice * size.percentage) / 100;
                })
            }
            const isExist = state.selectedOptions.some(item => item.pizzaId === action.payload.pizzaId);
            return isExist
                ? {
                    ...state,
                    selectedOptions: state.selectedOptions.map(item => {
                        if (item.pizzaId === action.payload.pizzaId) {
                            return {
                                ...item,
                                doughId: action.payload.doughId ? action.payload.doughId : item.doughId,
                                sizeId: action.payload.sizeId ? action.payload.sizeId : item.sizeId,
                                currentPrice: action.payload.sizeId ? currentPrice : item.currentPrice,
                            }
                        }
                        return item;
                    })
                }
                : {
                    ...state,
                    selectedOptions: [...state.selectedOptions, {
                        pizzaId: action.payload.pizzaId,
                        doughId: action.payload.doughId ? action.payload.doughId : '',
                        sizeId: action.payload.sizeId ? action.payload.sizeId : '',
                        currentPrice: currentPrice,
                    }]
                }
        }
        case CLEAR_SELECTED_OPTIONS: {
            return {
                ...state,
                selectedOptions: [],
            }
        }
        case CHANGE_CATEGORY: {
            return {
                ...state,
                currentCategory: action.categoryId,
            }
        }
        case CHANGE_SORT_CRITERION: {
            return {
                ...state,
                currentSortCriterion: action.sortCriterionId
            }
        }

        default:
            return state;
    }
}