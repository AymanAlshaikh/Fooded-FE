import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchRecipes } from "../../../store/actions/recipeActions";
import RecipeItem from "../RecipeItem";

import React, { useState } from "react";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ListSubheader from "@material-ui/core/ListSubheader";
import { useStyles } from "../Styles";
import ChefSearch from "../../Search";

const RecipeList = ({ chefRecipe }) => {
  const [search, setSearch] = useState("");
  const classes = useStyles();
  const recipes = useSelector((state) => state.recipeReducer.recipe);
  let recipeList;
  console.log("Coming from recipeList", chefRecipe);
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
      </div>
    </div>
  );
};
export default RecipeList;
