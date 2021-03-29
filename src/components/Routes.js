import { Route, Switch } from "react-router";
import Signup from "./Authentication/Signup";
import SignIn from "./Authentication/Signin";
import RecipeList from "./Recipe/RecipeList";

import UserProfile from "./UserProfile";
import RecipeDetail from "./Recipe/RecipeDetail";

import ChefList from "./Chef/ChefList";
import SessionList from "./Session/SessionList";

const Routes = () => {
  return (
    <Switch>
      <Route path="/recipes/:recipeSlug">
        <RecipeDetail />
      </Route>
      <Route path="/sessions">
        <SessionList />
      </Route>
      <Route path="/chefs">
        <ChefList />
      </Route>
      <Route path="/recipes">
        <RecipeList />
      </Route>
      <Route path="/profile">
        <UserProfile />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/signin">
        <SignIn />
      </Route>
    </Switch>
  );
};
export default Routes;
