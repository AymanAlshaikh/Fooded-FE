import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useStyles } from "./styles";

import {
  CircularProgress,
  Card,
  CardMedia,
  ButtonBase,
  Typography,
  CardHeader,
} from "@material-ui/core";

export default function SessionItem({ session }) {
  const classes = useStyles();
  const sessionId = session.id;
  const recipes = useSelector((state) => state.recipeReducer.recipe);
  const recipe = recipes.find((recipe) => recipe.id === session.recipeId);
  const recipeLoading = useSelector((state) => state.recipeReducer.loading);
  const user = useSelector((state) => state.authReducer.user);
  const chefs = useSelector((state) => state.chefReducer.chef);
  let chef = null;
  if (user) {
    chef = chefs.find((chef) => chef.userId === user.id);
  }

  const recipeChef = chefs.find((chef) => chef.id === recipe.chefId);

  if (recipeLoading)
    return (
      <div>
        <CircularProgress />
      </div>
    );
  return (
    <ButtonBase component={Link} to={`/sessions/${sessionId}`}>
      <Card className={classes.root} variant="outlined">
        <CardMedia
          image={recipe.image}
          className={classes.media}
          title={recipe.name}
        />
        <CardHeader
          title={recipe.name}
          subheader={`By Chef ${recipeChef.name}`}
        />
        <Typography
          className={classes.info}
          color="textSecondary"
          variant="subtitle2"
        >
          Date: {session.date}
          <br />
          Time: {session.time}
        </Typography>
      </Card>
    </ButtonBase>
  );
}
