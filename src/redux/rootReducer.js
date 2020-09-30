import { combineReducers } from 'redux';
import { pizzasReducer } from './reducers/pizzasReduser';
import { basketReducer } from './reducers/basketReducer';
import { filtersReducer } from './reducers/filtersReducer';

export const rootReducer = combineReducers({
  pizzas: pizzasReducer,
  basket: basketReducer,
  filters: filtersReducer
});
