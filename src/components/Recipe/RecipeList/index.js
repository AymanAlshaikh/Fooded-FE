import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ChefSearch from "../../Search";
import RecipeItem from "../RecipeItem";
import { useStyles } from "./styles";

import {
  CircularProgress,
  GridList,
  GridListTile,
  ListSubheader,
} from "@material-ui/core/";
import { Add } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { fetchRecipes } from "../../../store/actions/recipeActions";

const RecipeList = ({ chefRecipe, foundRecipe }) => {
  const [search, setSearch] = useState("");
  const classes = useStyles();
  const recipes = useSelector((state) => state.recipeReducer.recipe);
  const recipeLoading = useSelector((state) => state.recipeReducer.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    if (recipeLoading) dispatch(fetchRecipes());
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
    <div>
      <ChefSearch setSearch={setSearch} />
      <div className={classes.root}>
        <GridList cellHeight={180} className={classes.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
            <ListSubheader component="div">Recipes</ListSubheader>
          </GridListTile>
          {recipeList}
        </GridList>
        {user && user.isChef ? (
          <Link to="/recipes/new">
            <Add />
          </Link>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
export default RecipeList;
