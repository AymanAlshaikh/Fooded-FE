import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { signout } from "../../store/actions/authActions";
import { useStyles } from "./Styles";

import clsx from "clsx";
import {
  Typography,
  SwipeableDrawer,
  Button,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import {
  AccountBoxOutlined,
  Fastfood,
  LockOpen,
  Home,
  Menu,
  AssignmentInd,
  Settings,
  ExitToApp,
  VoiceChat,
  Book,
} from "@material-ui/icons";

export default function SwipeableTemporaryDrawer() {
  const user = useSelector((state) => state.authReducer.user);
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });
  const dispatch = useDispatch();
  const history = useHistory();

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
        {user ? <Typography> Hello, {user.username}.</Typography> : ""}
        <ListItem button component={Link} to={"/"}>
          <ListItemIcon>
            <Home />
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
            <VoiceChat />
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
                <Book />
              </ListItemIcon>
              <ListItemText primary={"Log"} />
            </ListItem>
            <ListItem button component={Link} to={"/profile"}>
              <ListItemIcon>
                <AssignmentInd />
              </ListItemIcon>
              <ListItemText primary={"Profile"} />
            </ListItem>
            <ListItem button component={Link} to={"/setting"}>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary={"Settings"} />
            </ListItem>
            <Divider />
            <ListItem
              button
              onClick={() => dispatch(signout(history.replace("/")))}
            >
              <ListItemIcon>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText primary={"Sign out"} />
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
            <Menu />
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
