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
} from "@material-ui/core/";

export default function SessionDetail() {
  const classes = useStyles();
  const { sessionId } = useParams();

  const allSessions = useSelector((state) => state.sessionReducer.session);

  const foundSession = allSessions.find((session) => session.id === +sessionId);
  const allChefs = useSelector((state) => state.chefReducer.chef);

  const allRecipes = useSelector((state) => state.recipeReducer.recipe);

  if (!foundSession) return <Redirect to="/sessions" />;

  const foundRecipe = allRecipes.find(
    (recipe) => recipe.id === foundSession.recipeId
  );

  const foundChef = allChefs.find((chef) => chef.id === foundRecipe.chefId);

  if (!foundSession) return <Redirect to="/sessions" />;
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={foundRecipe.image} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {`${foundRecipe.name} by ${foundChef.name}`}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {foundSession.date}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {foundSession.time}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
