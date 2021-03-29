import {
  CircularProgress,
  GridListTile,
  GridListTileBar,
  IconButton,
} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { useStyles } from "./Styles";

export default function SessionItem({ session }) {
  const classes = useStyles();
  // const recipeSlug = recipe.slug;
  const recipes = useSelector((state) => state.recipeReducer.recipe);
  const recipe = recipes.find((recipe) => recipe.id === session.recipeId);
  const loading = useSelector((state) => state.recipeReducer.loading);

  if (loading) return <CircularProgress />;
  return (
    // <Link to={`/recipes/${recipeSlug}`}>
    <GridListTile key={recipe.image}>
      <img
        src={recipe.image}
        alt={recipe.name}
        style={{ height: 500, width: 500 }}
      />
      <GridListTileBar
        title={recipe.name}
        subtitle={
          <span>
            {" "}
            {`Date: ${session.date}`} {`Time: ${session.time}`}
          </span>
        }
        actionIcon={
          <IconButton
            aria-label={`info about ${recipe.name}`}
            className={classes.icon}
          >
            <InfoIcon />
          </IconButton>
        }
      />
    </GridListTile>
    // </Link>
  );
}
