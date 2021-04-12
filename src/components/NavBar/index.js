import React from "react";
import { Link } from "react-router-dom";
import navLogo from "../../images/navLogo.svg";
import SwipeableTemporaryDrawer from "../Drawer";
import { useStyles } from "./styles";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  ButtonBase,
} from "@material-ui/core/";

export default function SearchAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <SwipeableTemporaryDrawer />
          </IconButton>

          <Typography
            component={Link}
            to={"/"}
            className={classes.title}
            noWrap
          >
            <img src={navLogo} alt={""} style={{ height: 40 }} />
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
