import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useStyles } from "./styles";

import {
  CircularProgress,
  ButtonBase,
  Card,
  CardMedia,
  CardHeader,
} from "@material-ui/core";

export default function ChefItem({ chef }) {
  const classes = useStyles();
  const users = useSelector((state) => state.userReducer.users);
  const _chef = users.find((user) => user.id === chef.userId);
  const loading = useSelector((state) => state.userReducer.loading);
  if (!_chef || loading) return <CircularProgress />;
  return (
    <ButtonBase component={Link} to={`/chefs/${_chef.slug}`}>
      <Card className={classes.root} variant="outlined">
        <CardMedia
          image={_chef.image}
          className={classes.media}
          title={`Chef ${_chef.username}`}
        />
        <CardHeader title={`Chef ${_chef.username}`} />
      </Card>
    </ButtonBase>
  );
}
