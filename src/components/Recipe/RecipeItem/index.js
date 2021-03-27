import {
  GridListTile,
  GridListTileBar,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import React from "react";

import { useStyles } from "./Styles";

export default function RecipeItem({ recipe }) {
  const classes = useStyles();

  return (
    <GridListTile key={recipe.image}>
      <img src={recipe.image} alt={recipe.name} style={{ width: 500 }} />
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
  );
}
