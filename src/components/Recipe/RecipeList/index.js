import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchRecipes } from "../../../store/actions/recipeActions";
import RecipeItem from "../RecipeItem";

import React from "react";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ListSubheader from "@material-ui/core/ListSubheader";
import { useStyles } from "../Styles";
import Search from "../../Search";

const RecipeList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  dispatch(fetchRecipes);
  const recipes = useSelector((state) => state.recipeReducer.recipe);

  const recipeList = recipes.map((recipe) => (
    <RecipeItem key={recipe.id} recipe={recipe} />
  ));
  return (
    <div>
      <Search />
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
