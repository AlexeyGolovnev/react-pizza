import {
  CLEAR_SELECTED_OPTIONS,
  GET_DOUGH_TYPES,
  GET_PIZZA_SIZES,
  GET_PIZZAS,
  SELECT_OPTIONS
} from '../actionTypes';

const initialState = {
  pizzas: [],
  doughTypes: [],
  pizzaSizes: [],
  selectedOptions: []
};

export const pizzasReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PIZZAS: {
      const pizzas = action.pizzas.map(pizza => {
        return {
          id: +pizza.id,
          ...pizza.data()
        };
      });
      return {
        ...state,
        pizzas: pizzas
      };
    }
    case GET_DOUGH_TYPES: {
      const doughs = action.doughTypes.map(dough => {
        return {
          id: +dough.id,
          ...dough.data()
        };
      });
      return {
        ...state,
        doughTypes: doughs
      };
    }
    case GET_PIZZA_SIZES: {
      const sizes = action.pizzaSizes.map(size => {
        return {
          id: +size.id,
          ...size.data()
        };
      });
      return {
        ...state,
        pizzaSizes: sizes
      };
    }
    case SELECT_OPTIONS: {
      let currentPrice = 0;
      if (action.payload.sizeId) {
        state.pizzas.map((pizza) => {
          if (pizza.id === action.payload.pizzaId) currentPrice = pizza.price;
        });
        state.pizzaSizes.map((size) => {
          if (action.payload.sizeId === size.id) {
            currentPrice += (currentPrice * size.percentage) / 100;
            currentPrice = +currentPrice.toFixed(2);
          }
        });
      }
      const isExist = state.selectedOptions.some((item) => item.pizzaId === action.payload.pizzaId);
      return isExist
        ? {
          ...state,
          selectedOptions: state.selectedOptions.map((item) => {
            if (item.pizzaId === action.payload.pizzaId) {
              return {
                ...item,
                doughId: action.payload.doughId ? action.payload.doughId : item.doughId,
                sizeId: action.payload.sizeId ? action.payload.sizeId : item.sizeId,
                currentPrice: action.payload.sizeId ? currentPrice : item.currentPrice
              };
            }
            return item;
          })
        }
        : {
          ...state,
          selectedOptions: [...state.selectedOptions, {
            pizzaId: action.payload.pizzaId,
            doughId: action.payload.doughId && action.payload.doughId,
            sizeId: action.payload.sizeId && action.payload.sizeId,
            currentPrice
          }]
        };
    }
    case CLEAR_SELECTED_OPTIONS: {
      return {
        ...state,
        selectedOptions: []
      };
    }
    default:
      return state;
  }
};
