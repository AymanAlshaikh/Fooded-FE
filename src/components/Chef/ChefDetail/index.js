import React from "react";
import { useSelector } from "react-redux";
import { Redirect, useParams } from "react-router";
import RecipeList from "../../Recipe/RecipeList";
import { useStyles } from "./Styles";

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core/";

export default function ChefDetail() {
  const classes = useStyles();
  const { chefSlug } = useParams();

  const userChef = useSelector((state) =>
    state.userReducer.users.find((user) => user.slug === chefSlug)
  );
  const _chef = useSelector((state) =>
    state.chefReducer.chef.find((chef) => chef.userId === userChef.id)
  );
  const allRecipes = useSelector((state) => state.recipeReducer.recipe);

  const _chefRecipe = allRecipes.filter(
    (_recipe) => _recipe.chefId === _chef.id
  );

  if (!userChef) return <Redirect to="/chefs" />;
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          title={userChef.firstName}
          image={userChef.image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {userChef.firstName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Recipes: <RecipeList chefRecipe={_chefRecipe} />
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
