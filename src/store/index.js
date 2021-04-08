import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

import { checkForToken, fetchProfile } from "./actions/authActions";
import { fetchUsers } from "./actions/userActions";

import { fetchRecipes } from "./actions/recipeActions";
import { fetchChefs } from "./actions/chefActions";
import { fetchSessions } from "./actions/sessionActions";
import { fetchCuisines } from "./actions/cuisineActions";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

store.dispatch(checkForToken());
store.dispatch(fetchUsers());

// store.dispatch(fetchProfile());
// store.dispatch(fetchRecipes());
// store.dispatch(fetchChefs());
// store.dispatch(fetchSessions());
// store.dispatch(fetchCuisines());

export default store;
