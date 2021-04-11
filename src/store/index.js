import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

import { checkForToken, fetchProfile } from "./actions/authActions";
import { fetchUsers } from "./actions/userActions";

import { fetchRecipes } from "./actions/recipeActions";
import { fetchChefs } from "./actions/chefActions";
import { fetchSessions } from "./actions/sessionActions";

import { fetchIngredients } from "./actions/ingredientActions";
import { fetchIngredientRecipes } from "./actions/ingredientRecipeActions";

import { fetchCuisines } from "./actions/cuisineActions";
import { fetchBookings } from "./actions/bookingActions";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

store.dispatch(checkForToken());
store.dispatch(fetchUsers());
store.dispatch(fetchSessions());
store.dispatch(fetchIngredients());
store.dispatch(fetchIngredientRecipes());

// store.dispatch(fetchProfile());
// store.dispatch(fetchRecipes());
// store.dispatch(fetchChefs());
// store.dispatch(fetchSessions());
// store.dispatch(fetchCuisines());
// store.dispatch(fetchBookings());
export default store;
