import { combineReducers } from "redux";
import authReducer from "./authReducer";
import recipeReducer from "./recipeReducer";
//Reducers

const rootReducer = combineReducers({
  authReducer,
  recipeReducer,
});

export default rootReducer;
