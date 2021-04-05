import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useStyles } from "./styles";
import InfoIcon from "@material-ui/icons/Info";
import {
  CircularProgress,
  GridListTile,
  GridListTileBar,
  IconButton,
} from "@material-ui/core";

export default function ChefItem({ chef }) {
  const classes = useStyles();
  const users = useSelector((state) => state.userReducer.users);
  const _chef = users.find((user) => user.id === chef.userId);
  const loading = useSelector((state) => state.userReducer.loading);
  if (!_chef || loading) return <CircularProgress />;
  return (
    <Link to={`/chefs/${_chef.slug}`}>
      <GridListTile key={_chef.image}>
        <img
          src={_chef.image}
          alt={_chef.username}
          style={{ height: 500, width: 500 }}
        />
        <GridListTileBar
          title={_chef.username}
          actionIcon={
            <IconButton
              aria-label={`info about ${_chef.username}`}
              className={classes.icon}
            >
              <InfoIcon />
            </IconButton>
          }
        />
      </GridListTile>
    </Link>
  );
}
