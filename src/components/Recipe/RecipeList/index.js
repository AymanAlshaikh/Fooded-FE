import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ChefSearch from "../../Search";
import RecipeItem from "../RecipeItem";
import { useStyles } from "./styles";
import { CircularProgress } from "@material-ui/core/";
import { useDispatch } from "react-redux";
import { fetchRecipes } from "../../../store/actions/recipeActions";
import { fetchChefs } from "../../../store/actions/chefActions";
import { Grid, IconButton } from "@material-ui/core/";
import { AddBox } from "@material-ui/icons";

const RecipeList = ({ chefRecipe, foundRecipe }) => {
  const [search, setSearch] = useState("");
  const classes = useStyles();
  const recipes = useSelector((state) => state.recipeReducer.recipe);
  const recipeLoading = useSelector((state) => state.recipeReducer.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    if (recipeLoading) dispatch(fetchRecipes());
    dispatch(fetchChefs());
  });
  const user = useSelector((state) => state.authReducer.user);

  let recipeList;
  if (chefRecipe) {
    recipeList = chefRecipe
      .filter((recipe) =>
        recipe.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      )
      .map((recipe) => <RecipeItem key={recipe.id} recipe={recipe} />);
  } else if (foundRecipe) {
    recipeList = foundRecipe
      .filter((recipe) =>
        recipe.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      )
      .map((recipe) => <RecipeItem key={recipe.id} recipe={recipe} />);
  } else
    recipeList = recipes
      .filter((recipe) =>
        recipe.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      )
      .map((recipe) => <RecipeItem key={recipe.id} recipe={recipe} />);

  if (recipeLoading) return <CircularProgress />;
  return (
    <Grid container className={classes.root}>
      <Grid container item justify="center">
        <Grid item xs={11}>
          <ChefSearch setSearch={setSearch} />
        </Grid>{" "}
        <Grid item direction="row-reverse" justify="flex-start">
          {user && user.isChef ? (
            <IconButton component={Link} to="/recipes/new">
              <AddBox />
            </IconButton>
          ) : (
            ""
          )}
        </Grid>
      </Grid>
      <Grid container item className={classes.root}>
        {recipeList}
      </Grid>
    </Grid>
  );
};
export default RecipeList;
