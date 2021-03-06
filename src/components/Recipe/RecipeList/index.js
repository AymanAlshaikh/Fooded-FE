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
import { Grid, Fab } from "@material-ui/core/";
import { AddBox } from "@material-ui/icons";
import CuisineFilter from "../CuisineFilter";

const RecipeList = ({ recipes }) => {
  useEffect(() => {
    if (recipeLoading || cuisinesLoading) {
      dispatch(fetchRecipes());
      dispatch(fetchChefs());
      dispatch(fetchCuisines());
    }
  });

  const cuisinesLoading = useSelector((state) => state.cuisineReducer.loading);
  const [cuisine, setCuisine] = useState([]);
  const [search, setSearch] = useState("");
  const classes = useStyles();
  const _recipes = useSelector((state) => state.recipeReducer.recipe);
  const recipeLoading = useSelector((state) => state.recipeReducer.loading);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.user);

  if (recipeLoading || cuisinesLoading) return <CircularProgress />;
  let recipeList = recipes || _recipes;

  recipeList = recipeList
    .filter(
      (recipe) => cuisine.includes(recipe.cuisineId) || cuisine.length === 0
    )
    .filter((recipe) =>
      recipe.name.toLowerCase().includes(search.toLowerCase())
    )
    .map((recipe) => <RecipeItem key={recipe.id} recipe={recipe} />);

  return (
    <Grid container className={classes.root} alignItems="center">
      <CuisineFilter setCuisine={setCuisine} cuisine={cuisine} />
      <Grid container item justify="center">
        <Grid item xs={11}>
          <ChefSearch setSearch={setSearch} />
        </Grid>
        <Grid item direction="row-reverse" justify="flex-start">
          {user && user.isChef ? (
            <Fab component={Link} to="/recipes/new">
              <AddBox />
            </Fab>
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
