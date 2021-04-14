import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import navLogo from "../../images/navLogo.svg";
import SwipeableTemporaryDrawer from "../Drawer";
import { useStyles } from "./styles";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Tooltip,
  Grid,
  Button,
} from "@material-ui/core/";
import { PersonRounded, PersonAddRounded } from "@material-ui/icons/";

export default function SearchAppBar() {
  const user = useSelector((state) => state.authReducer.user);
  const classes = useStyles();
  const icon = "31394d";

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

          <Typography component={Link} to="/" className={classes.title} noWrap>
            <img src={navLogo} alt={""} style={{ height: 40 }} />
          </Typography>

          {user ? (
            <Button component={Link} to="profile">
              <Typography>Hello, {user.username}.</Typography>
            </Button>
          ) : (
            <>
              <Tooltip title="Sign Up">
                <IconButton component={Link} to={"/signup"}>
                  <PersonAddRounded
                    style={{ color: icon }}
                    fontSize={"large"}
                  />
                </IconButton>
              </Tooltip>
              <Tooltip title="Sign In">
                <IconButton component={Link} to={"/signin"}>
                  <PersonRounded style={{ color: icon }} fontSize={"large"} />
                </IconButton>
              </Tooltip>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
