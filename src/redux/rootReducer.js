import {combineReducers} from "redux";
import {pizzasReducer} from "./reducers/pizzasReduser";
import {basketReducer} from "./reducers/basketReducer";

export const rootReducer = combineReducers({
    pizzas:pizzasReducer,
    basket:basketReducer,
});