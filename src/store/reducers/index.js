import { combineReducers } from "redux";
import authReducer from "./authReducer";
//Reducers

const rootReducer = combineReducers({
  authReducer,
});

export default rootReducer;
