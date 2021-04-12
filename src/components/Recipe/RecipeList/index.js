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
import { fetchCuisines } from "../../../store/actions/cuisineActions";
import { Grid, IconButton } from "@material-ui/core/";
import { AddBox } from "@material-ui/icons";
import CuisineFilter from "../CuisineFilter";

const RecipeList = ({ chefRecipe, foundRecipe }) => {
  useEffect(() => {
    if (recipeLoading || cuisinesLoading) {
      dispatch(fetchRecipes());
      dispatch(fetchChefs());
      dispatch(fetchCuisines());
    }
  });
  const cuisines = useSelector((state) => state.cuisineReducer.cuisine);
  const cuisinesLoading = useSelector((state) => state.cuisineReducer.loading);
  const cuisineIds = cuisines.map((cuisine) => cuisine.id);
  const [cuisine, setCuisine] = useState(cuisineIds);
  console.log(cuisine);
  const [search, setSearch] = useState("");
  const classes = useStyles();
  const recipes = useSelector((state) => state.recipeReducer.recipe);
  const recipeLoading = useSelector((state) => state.recipeReducer.loading);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.user);

  let recipeList;
  if (chefRecipe) {
    recipeList = chefRecipe
      .filter(
        (recipe) =>
          recipe.name
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase()) ||
          cuisine.map((cuis) => cuis === recipe.cuisineId.toString())
      )
      .map((recipe) => <RecipeItem key={recipe.id} recipe={recipe} />);
  } else if (foundRecipe) {
    recipeList = foundRecipe
      .filter(
        (recipe) =>
          recipe.name
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase()) ||
          cuisine.map((cuis) => cuis === recipe.cuisineId.toString())
      )
      .map((recipe) => <RecipeItem key={recipe.id} recipe={recipe} />);
  } else
    recipeList = recipes
      .filter(
        (recipe) =>
          recipe.name
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase()) ||
          cuisine.map((cuis) => cuis === recipe.cuisineId.toString())
      )
      .map((recipe) => <RecipeItem key={recipe.id} recipe={recipe} />);

  console.log(recipeList);
  if (recipeLoading) return <CircularProgress />;
  return (
    <Grid container className={classes.root}>
      <CuisineFilter setCuisine={setCuisine} cuisine={cuisine} />
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
