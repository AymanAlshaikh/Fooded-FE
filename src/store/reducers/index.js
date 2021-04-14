import { combineReducers } from "redux";
import authReducer from "./authReducer";
import recipeReducer from "./recipeReducer";
import chefReducer from "./chefReducer";
import userReducer from "./userReducer";
import sessionReducer from "./sessionReducer";
import ingredientReducer from "./ingredientReducer";
import ingredientRecipeReducer from "./ingredientRecipeReducer";
//Reducers
import cuisineReducer from "./cuisineReducer";
import bookingReducer from "./bookingReducer";

const rootReducer = combineReducers({
  authReducer,
  recipeReducer,
  chefReducer,
  userReducer,
  sessionReducer,
  ingredientReducer,
  ingredientRecipeReducer,
  cuisineReducer,
  bookingReducer,
});

export default rootReducer;
