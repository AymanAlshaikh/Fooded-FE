import React from "react";
import { useSelector } from "react-redux";
import { Redirect, useParams } from "react-router";
import { useStyles } from "./Styles";

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core/";

export default function RecipeDetail() {
  const classes = useStyles();
  const { recipeSlug } = useParams();

  const recipe = useSelector((state) =>
    state.recipeReducer.recipe.find((recipe) => recipe.slug === recipeSlug)
  );

  if (!recipe) return <Redirect to="/recipes" />;
  return (
    <Card className={classes.root}>
      <CardActionArea>
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
            Ingredients: {recipe.ingredientDescription}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
