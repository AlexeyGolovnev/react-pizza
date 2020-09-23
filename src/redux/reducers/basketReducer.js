import {ADD_PIZZA_TO_BASKET, CALCULATE_TOTAL_DATA} from "../actionTypes";

const initialState = {
    selectedPizzas: [],
    totalPrice: 0,
    totalCount: 0,

}

export const basketReducer = (state = initialState, action) => {
    switch (action.type) {

        case ADD_PIZZA_TO_BASKET : {
            if (action.payload.doughId && action.payload.sizeId) {
                if (state.selectedPizzas.length > 0) {
                    let isEqual = false;
                    state.selectedPizzas.forEach(pizza => {
                        if (pizza.pizzaId === action.payload.pizzaId) {
                            isEqual = pizza.doughId === action.payload.doughId && pizza.sizeId === action.payload.sizeId
                        }
                    })
                    if (isEqual) {
                        return {
                            ...state,
                            selectedPizzas: state.selectedPizzas.map(pizza => {
                                if (pizza.pizzaId === action.payload.pizzaId) {
                                    pizza.pizzasCount++;
                                    pizza.price += action.payload.price;
                                }
                                return pizza;
                            }),

                        }
                    } else {
                        return {
                            ...state,
                            selectedPizzas: [...state.selectedPizzas, action.payload],
                        }
                    }
                }
                return {
                    ...state,
                    selectedPizzas: [...state.selectedPizzas, action.payload],
                }
            }

        }
        case CALCULATE_TOTAL_DATA: {
            return {
                ...state,
                totalCount: state.selectedPizzas.reduce((acc, pizza) => acc + pizza.pizzasCount, 0),
                totalPrice: +state.selectedPizzas.reduce((acc, pizza) => acc + pizza.price, 0).toFixed(3)
            }
        }

        default:
            return state;
    }
}