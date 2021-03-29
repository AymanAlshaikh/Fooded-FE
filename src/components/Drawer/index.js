import React from "react";
import clsx from "clsx";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SettingsIcon from "@material-ui/icons/Settings";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import BookIcon from "@material-ui/icons/Book";
import ReceiptIcon from "@material-ui/icons/Receipt";
import VoiceChatIcon from "@material-ui/icons/VoiceChat";
import HomeIcon from "@material-ui/icons/Home";
import MenuIcon from "@material-ui/icons/Menu";
import { useStyles } from "./Styles";
import { Link } from "react-router-dom";
import { AccountBoxOutlined, Fastfood, LockOpen } from "@material-ui/icons";
import { Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

export default function SwipeableTemporaryDrawer() {
  const user = useSelector((state) => state.authReducer.user);
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "left",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {user ? <Typography>Welcome {user.username}</Typography> : ""}
        <ListItem button component={Link} to={"/"}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={"Home"} />
        </ListItem>
        <ListItem button component={Link} to={"/chefs"}>
          <ListItemIcon>
            <AccountBoxOutlined />
          </ListItemIcon>
          <ListItemText primary={"Chefs"} />
        </ListItem>
        <ListItem button component={Link} to={"/recipes"}>
          <ListItemIcon>
            <Fastfood />
          </ListItemIcon>
          <ListItemText primary={"Recipes"} />
        </ListItem>
        <ListItem button component={Link} to={"/sessions"}>
          <ListItemIcon>
            <VoiceChatIcon />
          </ListItemIcon>
          <ListItemText primary={"Sessions"} />
        </ListItem>
      </List>
      <Divider />
      <List>
        {user ? (
          <div>
            <ListItem button component={Link} to={"/log"}>
              <ListItemIcon>
                <BookIcon />
              </ListItemIcon>
              <ListItemText primary={"Log"} />
            </ListItem>
            <ListItem button component={Link} to={"/profile"}>
              <ListItemIcon>
                <AssignmentIndIcon />
              </ListItemIcon>
              <ListItemText primary={"Profile"} />
            </ListItem>
            <ListItem button component={Link} to={"/setting"}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              {/* this should be changed to reset password */}
              <ListItemText primary={"Settings"} />
            </ListItem>
          </div>
        ) : (
          <div>
            <ListItem button component={Link} to={"/signin"}>
              <ListItemIcon>
                <LockOpen />
              </ListItemIcon>
              <ListItemText primary={"Sign in"} />
            </ListItem>
            <ListItem button component={Link} to={"/signup"}>
              <ListItemIcon>
                <LockOpen />
              </ListItemIcon>
              <ListItemText primary={"Sign up"} />
            </ListItem>
          </div>
        )}
      </List>
    </div>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <MenuIcon />
          </Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
