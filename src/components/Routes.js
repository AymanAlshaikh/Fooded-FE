import { Route, Switch } from "react-router";
import Home from "./Home";
import Signup from "./Authentication/Signup";
import SignIn from "./Authentication/Signin";
import UserProfile from "./UserProfile";

import ChefProfile from "./Chef/ChefProfile";
import ChefList from "./Chef/ChefList";
import ChefDetail from "./Chef/ChefDetail";

import AddRecipe from "./Recipe/AddRecipe";
import RecipeList from "./Recipe/RecipeList";
import RecipeDetail from "./Recipe/RecipeDetail";

import AddSession from "./Session/AddSession";
import SessionList from "./Session/SessionList";
import SessionDetail from "./Session/SessionDetail";

import CuisineList from "./Cuisine/CuisineList";

import Booking from "./Session/Booking";
import Page404 from "./404";

const Routes = () => {
  return (
    <Switch>
      <Route path={["/sessions/new", "/sessions/:sessionId/edit"]}>
        <AddSession />
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
      <Route path="/cuisine">
        <CuisineList />
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
      <Route path={"/404"}>
        <Page404 />
      </Route>
      <Route path={"/log"}>
        <ChefProfile />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
};
export default Routes;
