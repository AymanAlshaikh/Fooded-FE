import { useSelector } from "react-redux";
import RecipeItem from "../RecipeItem";

import React, { useState } from "react";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ListSubheader from "@material-ui/core/ListSubheader";
import { useStyles } from "../Styles";
import ChefSearch from "../../Search";
import { Add } from "@material-ui/icons";
import { Link } from "react-router-dom";
const RecipeList = ({ chefRecipe }) => {
  const [search, setSearch] = useState("");
  const classes = useStyles();
  const recipes = useSelector((state) => state.recipeReducer.recipe);
  const user = useSelector((state) => state.authReducer.user);
  let recipeList;
  if (chefRecipe) {
    recipeList = chefRecipe
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
