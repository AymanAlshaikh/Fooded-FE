import React from "react";
import { useSelector } from "react-redux";
import { Redirect, useParams } from "react-router";
import { useStyles } from "./styles";

import { Card, CardContent, CardMedia, Typography } from "@material-ui/core/";

export default function RecipeDetail() {
  const classes = useStyles();
  const { recipeSlug } = useParams();

  const recipe = useSelector((state) =>
    state.recipeReducer.recipe.find((recipe) => recipe.slug === recipeSlug)
  );
  console.log(recipe.ingredientDescription);
  //ingredients names
  const ingredients = useSelector(
    (state) => state.ingredientReducer.ingredients
  );
  const ingredientsAsArray = recipe.ingredientDescription.split(",");
  const _matchingIngredients = ingredientsAsArray.map((ingredient) =>
    ingredients.filter(
      (_ingredient) => _ingredient.id.toString() === ingredient
    )
  );
  const _ingredientsNames = _matchingIngredients.map((ingrediant) =>
    ingrediant.map((inside) => ` ${inside.name},`)
  );

  if (!recipe) return <Redirect to="/recipes" />;
  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={recipe.image}
        title={recipe.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {recipe.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Description: {recipe.description}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Ingredients: {_ingredientsNames}
        </Typography>
      </CardContent>
    </Card>
  );
}
