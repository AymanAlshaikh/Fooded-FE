import { GridListTile, GridListTileBar, IconButton } from "@material-ui/core";
import { Update } from "@material-ui/icons";
import InfoIcon from "@material-ui/icons/Info";
import React from "react";
import { Link } from "react-router-dom";

import { useStyles } from "../Styles";

export default function RecipeItem({ recipe }) {
  const classes = useStyles();
  const recipeSlug = recipe.slug;
  return (
    <div>
      <Link to={`/recipes/${recipeSlug}`}>
        <GridListTile key={recipe.image}>
          <img
            src={recipe.image}
            alt={recipe.name}
            style={{ height: 500, width: 500 }}
          />
          <GridListTileBar
            title={recipe.name}
            subtitle={<span> {recipe.description}</span>}
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
      </Link>
      <Link to={`/recipes/${recipeSlug}/edit`}>
        <Update />
      </Link>
    </div>
  );
}
