/* eslint-disable no-fallthrough */
import {
  ADD_PIZZA_TO_BASKET,
  CALCULATE_TOTAL_DATA,
  CLEAR_BASKET,
  DELETE_ONE_PIZZA_FROM_BASKET,
  DELETE_PIZZA_FROM_BASKET
} from '../actionTypes';

const initialState = {
  selectedPizzas: [],
  totalPrice: 0,
  totalCount: 0
};

export const basketReducer = (state = initialState, action) => {
  const checkCompare = () => {
    let flag = false;
    let equalItemIndex = -1;
    state.selectedPizzas.forEach((pizza, index) => {
      if (
        pizza.pizzaId === action.payload.pizzaId &&
        pizza.doughId === action.payload.doughId &&
        pizza.sizeId === action.payload.sizeId
      ) {
        flag = true;
        equalItemIndex = index;
      }
    });

    return [equalItemIndex, flag];
  };

  switch (action.type) {
    case ADD_PIZZA_TO_BASKET: {
      if (action.payload.doughId && action.payload.sizeId) {
        if (state.selectedPizzas.length > 0) {
          const isEqual = checkCompare()[1];
          const equalItemIndex = checkCompare()[0];
          if (isEqual) {
            return {
              ...state,
              selectedPizzas: state.selectedPizzas.map((pizza, index) => {
                if (equalItemIndex === index) {
                  pizza.pizzasCount++;
                  pizza.price = +(pizza.price + action.payload.price).toFixed(2);
                }
                return pizza;
              })
            };
          }
        }
        return {
          ...state,
          selectedPizzas: [...state.selectedPizzas, action.payload]
        };
      }
    }

    case DELETE_ONE_PIZZA_FROM_BASKET: {
      if (action.payload.doughId && action.payload.sizeId) {
        if (state.selectedPizzas.length > 0) {
          const isEqual = checkCompare()[1];
          const equalItemIndex = checkCompare()[0];
          if (isEqual) {
            return {
              ...state,
              selectedPizzas: state.selectedPizzas.map((pizza, index) => {
                if (equalItemIndex === index && pizza.pizzasCount > 1) {
                  pizza.price = +(pizza.price - pizza.price / pizza.pizzasCount).toFixed(2);
                  pizza.pizzasCount--;
                }
                return pizza;
              })
            };
          }
        }
        return {
          ...state,
          selectedPizzas: [...state.selectedPizzas, action.payload]
        };
      }
    }
    case DELETE_PIZZA_FROM_BASKET: {
      return {
        ...state,
        selectedPizzas: state.selectedPizzas.filter((pizza) => {
          if (pizza.pizzaId === action.payload.pizzaId) {
            if (
              pizza.doughId !== action.payload.doughId ||
              pizza.sizeId !== action.payload.sizeId
            ) {
              return pizza;
            }
          } else return pizza;
        })
      };
    }

    case CALCULATE_TOTAL_DATA: {
      return {
        ...state,
        totalCount: state.selectedPizzas.reduce((acc, pizza) => acc + pizza.pizzasCount, 0),
        totalPrice: +state.selectedPizzas.reduce((acc, pizza) => acc + pizza.price, 0).toFixed(2)
      };
    }

    case CLEAR_BASKET: {
      return {
        ...state,
        selectedPizzas: []
      };
    }

    default:
      return state;
  }
};
