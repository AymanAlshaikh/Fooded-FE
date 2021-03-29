import { combineReducers } from "redux";
import authReducer from "./authReducer";
import recipeReducer from "./recipeReducer";
import chefReducer from "./chefReducer";
import userReducer from "./userReducer";
//Reducers

const rootReducer = combineReducers({
  authReducer,
  recipeReducer,
  chefReducer,
  userReducer,
});

export default rootReducer;
