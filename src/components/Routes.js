import { Route, Switch } from "react-router";
import Signup from "./Authentication/Signup";
import SignIn from "./Authentication/Signin";
import RecipeList from "./Recipe/RecipeList";
import RecipeDetail from "./Recipe/RecipeDetail";

const Routes = () => {
  return (
    <Switch>
      <Route path="/recipes/:recipeSlug">
        <RecipeDetail />
      </Route>
      <Route path="/recipes">
        <RecipeList />
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
