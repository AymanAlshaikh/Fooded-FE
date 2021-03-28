import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";
import { useStyles } from "./Styles";
import { Redirect, useParams } from "react-router";

export default function RecipeDetail() {
  const classes = useStyles();
  const { recipeSlug } = useParams();

  const recipe = useSelector((state) =>
    state.recipeReducer.recipe.find((recipe) => recipe.slug === recipeSlug)
  );

  console.log(recipeSlug);

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
