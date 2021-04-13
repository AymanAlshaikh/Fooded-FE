import React from "react";
import { useSelector } from "react-redux";
import { Redirect, useParams } from "react-router";
import ChefItem from "../ChefItem";
import RecipeList from "../../Recipe/RecipeList";
import { useStyles } from "./styles";

import { Grid } from "@material-ui/core/";

export default function ChefDetail() {
  const classes = useStyles();
  const { chefSlug } = useParams();

  const userChef = useSelector((state) =>
    state.userReducer.users.find((user) => user.slug === chefSlug)
  );
  const _chef = useSelector((state) =>
    state.chefReducer.chef.find((chef) => chef.userId === userChef.id)
  );
  const allRecipes = useSelector((state) => state.recipeReducer.recipe);

  const _chefRecipe = allRecipes.filter(
    (_recipe) => _recipe.chefId === _chef.id
  );

  if (!userChef) return <Redirect to="/chefs" />;
  return (
    <Grid container className={classes.root}>
      <Grid item xs={3}>
        <ChefItem key={_chef.id} chef={_chef} />
      </Grid>
      <Grid item xs={9}>
        <RecipeList recipes={_chefRecipe} />
      </Grid>
    </Grid>
  );
}
