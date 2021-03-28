import { GridListTile, GridListTileBar, IconButton } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import React from "react";
import { useSelector } from "react-redux";

import { useStyles } from "./Styles";

export default function ChefItem({ chef }) {
  const classes = useStyles();
  const users = useSelector((state) => state.userReducer.users);
  const _chef = users.find((user) => user.id === chef.userId);
  console.log(_chef);

  return (
    <GridListTile key={_chef.image}>
      <img
        src={_chef.image}
        alt={_chef.name}
        style={{ height: 500, width: 500 }}
      />
      <GridListTileBar
        title={_chef.name}
        actionIcon={
          <IconButton
            aria-label={`info about ${_chef.name}`}
            className={classes.icon}
          >
            <InfoIcon />
          </IconButton>
        }
      />
    </GridListTile>
  );
}
