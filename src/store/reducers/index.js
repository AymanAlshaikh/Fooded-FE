import { combineReducers } from "redux";
import authReducer from "./authReducer";
import recipeReducer from "./recipeReducer";
import chefReducer from "./chefReducer";
import userReducer from "./userReducer";
import sessionReducer from "./sessionReducer";
import cuisineReducer from "./cuisineReducer";

const rootReducer = combineReducers({
  authReducer,
  recipeReducer,
  chefReducer,
  userReducer,
  sessionReducer,
  cuisineReducer,
});

export default rootReducer;
