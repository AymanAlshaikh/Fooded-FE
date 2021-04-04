import { Route, Switch } from "react-router";
import Signup from "./Authentication/Signup";
import SignIn from "./Authentication/Signin";
import RecipeList from "./Recipe/RecipeList";

import UserProfile from "./UserProfile";
import RecipeDetail from "./Recipe/RecipeDetail";
import ChefDetail from "./Chef/ChefDetail";
import SessionDetail from "./Session/SessionDetail";
import AddRecipe from "./Recipe/AddRecipe";

import ChefList from "./Chef/ChefList";
import SessionList from "./Session/SessionList";
import AddSession from "./Session/AddSession";
import Booking from "./Session/Booking";
import ChefProfile from "./Chef/ChefProfile";
const Routes = () => {
  return (
    <Switch>
      <Route path={["/sessions/new", "/sessions/:sessionId/edit"]}>
        <AddSession />
      </Route>
      <Route path={"/log"}>
        <ChefProfile />
      </Route>
      <Route path={["/recipes/new", "/recipes/:recipeSlug/edit"]}>
        <AddRecipe />
      </Route>
      <Route path="/sessions/:sessionId/booking">
        <Booking />
      </Route>
      <Route path="/sessions/:sessionId">
        <SessionDetail />
      </Route>
      <Route path="/chefs/:chefSlug">
        <ChefDetail />
      </Route>
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
