import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { signout } from "../../store/actions/authActions";
import { useStyles, ListItem } from "./styles";
import theme from "../../theme";
import menuIcon from "../../images/menuIcon.png";

import clsx from "clsx";
import {
  CssBaseline,
  Typography,
  SwipeableDrawer,
  Button,
  List,
  Divider,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import {
  AccountCircle,
  Fastfood,
  LockOpen,
  Home,
  AssignmentInd,
  ExitToApp,
  VoiceChat,
  Book,
  RestaurantSharp,
} from "@material-ui/icons";

export default function SwipeableTemporaryDrawer() {
  const user = useSelector((state) => state.authReducer.user);
  const classes = useStyles();
  const icon = theme.palette.secondary.dark;
  const [state, setState] = React.useState({
    left: false,
  });
  const [selectedIndex, setSelectedIndex] = React.useState();
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
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
      <List component="nav">
        {/* <img src={innerLogo} style={{ height: 30 }} /> */}

        {user ? (
          <>
            <Typography> Hello, {user.username}.</Typography>
            <Divider />
          </>
        ) : (
          ""
        )}
        <ListItem
          button
          component={Link}
          to={"/"}
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <ListItemIcon>
            <Home classNames={classes.icon} style={{ color: icon }} />
          </ListItemIcon>
          <ListItemText primary={"Home"} />
        </ListItem>
        <ListItem
          classNames={classes.icon}
          button
          component={Link}
          to={"/chefs"}
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemIcon classNames={classes.icon}>
            <AccountCircle style={{ color: icon }} />
          </ListItemIcon>
          <ListItemText primary={"Chefs"} />
        </ListItem>
        <ListItem
          button
          component={Link}
          to={"/recipes"}
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
        >
          <ListItemIcon>
            <Fastfood style={{ color: icon }} />
          </ListItemIcon>
          <ListItemText primary={"Recipes"} />
        </ListItem>
        <ListItem
          button
          component={Link}
          to={"/sessions"}
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}
        >
          <ListItemIcon>
            <VoiceChat style={{ color: icon }} />
          </ListItemIcon>
          <ListItemText primary={"Sessions"} />
        </ListItem>
        <ListItem button component={Link} to={"/cuisine"}>
          <ListItemIcon>
            <RestaurantSharp />
          </ListItemIcon>
          <ListItemText primary={"Cuisine"} />
        </ListItem>
      </List>
      <Divider />
      <List>
        {user ? (
          <div>
            <ListItem
              button
              component={Link}
              to={"/log"}
              selected={selectedIndex === 4}
              onClick={(event) => handleListItemClick(event, 4)}
            >
              <ListItemIcon>
                <Book style={{ color: icon }} />
              </ListItemIcon>
              <ListItemText primary={"Log"} />
            </ListItem>
            <ListItem
              button
              component={Link}
              to={"/profile"}
              selected={selectedIndex === 5}
              onClick={(event) => handleListItemClick(event, 5)}
            >
              <ListItemIcon>
                <AssignmentInd style={{ color: icon }} />
              </ListItemIcon>
              <ListItemText primary={"Profile"} />
            </ListItem>
            <Divider />
            <ListItem
              button
              onClick={() => dispatch(signout(history.replace("/")))}
            >
              <ListItemIcon>
                <ExitToApp style={{ color: icon }} />
              </ListItemIcon>
              <ListItemText primary={"Sign out"} />
            </ListItem>
          </div>
        ) : (
          <div>
            <ListItem
              button
              component={Link}
              to={"/signin"}
              selected={selectedIndex === 6}
              onClick={(event) => handleListItemClick(event, 6)}
            >
              <ListItemIcon>
                <LockOpen style={{ color: icon }} />
              </ListItemIcon>
              <ListItemText primary={"Sign in"} />
            </ListItem>
            <ListItem
              button
              component={Link}
              to={"/signup"}
              selected={selectedIndex === 7}
              onClick={(event) => handleListItemClick(event, 7)}
            >
              <ListItemIcon>
                <LockOpen style={{ color: icon }} />
              </ListItemIcon>
              <ListItemText primary={"Join FoodED"} />
            </ListItem>
          </div>
        )}
      </List>
    </div>
  );

  return (
    <div>
      <CssBaseline />
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <img
              src={menuIcon}
              alt={"menu"}
              style={{ height: 32, width: 32 }}
            />{" "}
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
