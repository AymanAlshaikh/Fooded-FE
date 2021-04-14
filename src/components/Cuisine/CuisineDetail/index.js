import React from "react";
import { useSelector } from "react-redux";
import { Redirect, useParams } from "react-router";
import { useStyles } from "./styles";

import {
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Typography,
  CircularProgress,
} from "@material-ui/core/";
import RecipeList from "../../Recipe/RecipeList";

export default function CuisineDetail() {
  const classes = useStyles();
  const { cuisineSlug } = useParams();

  const cuisineLoading = useSelector((state) => state.cuisineReducer.loading);
  // const recipeLoading = useSelector((state) => state.recipeReducer.loading);

  const allCuisine = useSelector((state) => state.cuisineReducer.cuisine);

  const foundCuisine = allCuisine.find(
    (cuisine) => cuisine.slug === cuisineSlug
  );

  const allRecipes = useSelector((state) => state.recipeReducer.recipe);

  if (!foundCuisine) return <Redirect to="/cuisine" />;

  const foundRecipe = allRecipes.filter(
    (recipe) => recipe.cuisineId === foundCuisine.id
  );

  if (cuisineLoading) return <CircularProgress />;
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Typography variant="body2" color="textSecondary" component="p">
          {`${foundCuisine.name} Cuisine`}
        </Typography>
        <CardMedia className={classes.media} image={foundRecipe.image} />
        <CardContent>
          <RecipeList recipes={foundRecipe} />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
