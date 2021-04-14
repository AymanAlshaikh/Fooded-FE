import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ChefSearch from "../../Search";
import RecipeItem from "../RecipeItem";
import { useStyles } from "./styles";
import Pagination from "@material-ui/lab/Pagination";
import { CircularProgress } from "@material-ui/core/";
import { useDispatch } from "react-redux";
import { fetchRecipes } from "../../../store/actions/recipeActions";
import { fetchChefs } from "../../../store/actions/chefActions";
import { fetchCuisines } from "../../../store/actions/cuisineActions";
import { Grid, IconButton } from "@material-ui/core/";
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

  //Pagination
  const [page, setPage] = useState(1);
  let RecipesPerPage;
  let d = 8;
  let start = page * d - d;
  let end = page * d;
  const recipeLength = _recipes.length / d;
  const settingRecipePerPage = () => {
    RecipesPerPage = _recipes.slice(start, end);
    return RecipesPerPage;
  };
  settingRecipePerPage();
  const handleChange = (event, value) => {
    setPage(value);
    // settingRecipePerPage();
  };

  if (recipeLoading || cuisinesLoading) return <CircularProgress />;
  let recipeList = recipes || _recipes;

  recipeList = RecipesPerPage.filter(
    (recipe) => cuisine.includes(recipe.cuisineId) || cuisine.length === 0
  )
    .filter((recipe) =>
      recipe.name.toLowerCase().includes(search.toLowerCase())
    )
    .map((recipe) => <RecipeItem key={recipe.id} recipe={recipe} />);

  return (
    <Grid container className={classes.root}>
      <CuisineFilter setCuisine={setCuisine} cuisine={cuisine} />
      <Grid container item justify="center">
        <Grid item xs={11}>
          <ChefSearch setSearch={setSearch} />
        </Grid>
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
      <Pagination count={recipeLength} page={page} onChange={handleChange} />
    </Grid>
  );
};
export default RecipeList;
