import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

import { checkForToken, fetchProfile } from "./actions/authActions";
import { fetchRecipes } from "./actions/recipeActions";
import { fetchChefs } from "./actions/chefActions";
import { fetchUsers } from "./actions/userActions";
import { fetchSessions } from "./actions/sessionActions";
import { fetchIngredients } from "./actions/ingredientActions";
import { fetchIngredientRecipes } from "./actions/ingredientRecipeActions";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

store.dispatch(checkForToken());
store.dispatch(fetchProfile());
store.dispatch(fetchRecipes());
store.dispatch(fetchChefs());
store.dispatch(fetchUsers());
store.dispatch(fetchSessions());
store.dispatch(fetchIngredients());
store.dispatch(fetchIngredientRecipes());

export default store;
