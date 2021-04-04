import React from "react";
import { useSelector } from "react-redux";

const ChefProfile = () => {
  const user = useSelector((state) => state.authReducer.user);
  const loading = useSelector((state) => state.authReducer.loading);

  const chefs = useSelector((state) => state.chefReducer.chef);
  const thisChef = chefs.find((chef) => chef.userId === user.id);
  const ChefID = thisChef.id;

  const recipes = useSelector((state) => state.recipeReducer.recipe);
  const chefRecipe = recipes.filter((recipe) => recipe.chefId === ChefID);

  const sessions = useSelector((state) => state.sessionReducer.session);

  const sessionList = chefRecipe.map((recipe) =>
    sessions.find((session) => session.recipeId === recipe.id)
  );
  if (!loading) {
    console.log("session list: ", sessionList);
    console.log("sessions: ", sessions);
    console.log(chefRecipe);
    console.log(ChefID);
    console.log(thisChef);
  }
  return <h1>Hello</h1>;
};
export default ChefProfile;
