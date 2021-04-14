import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SessionSearch from "../Search";
import SessionItem from "../SessionItem";
import { useStyles } from "./styles";

import {
  CircularProgress,
  GridList,
  GridListTile,
  IconButton,
  ListSubheader,
  Grid,
} from "@material-ui/core";
import { AddBox } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { fetchSessions } from "../../../store/actions/sessionActions";
import { fetchRecipes } from "../../../store/actions/recipeActions";
import { fetchChefs } from "../../../store/actions/chefActions";
import CuisineFilter from "../../Recipe/CuisineFilter";
import { fetchCuisines } from "../../../store/actions/cuisineActions";

const SessionList = () => {
  const [cuisine, setCuisine] = useState([]);
  const classes = useStyles();
  const sessions = useSelector((state) => state.sessionReducer.session);
  const sessionLoading = useSelector((state) => state.sessionReducer.loading);
  const cuisineLoading = useSelector((state) => state.cuisineReducer.loading);
  const recipeLoading = useSelector((state) => state.recipeReducer.loading);
  const user = useSelector((state) => state.authReducer.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (sessionLoading || recipeLoading) {
      dispatch(fetchSessions());
      dispatch(fetchChefs()); //we need this for RecipeItem
      dispatch(fetchRecipes());
      dispatch(fetchCuisines()); //we need this for checkboxes
    }
  });
  const SessionList = sessions
    .filter(
      (session) => cuisine.includes(session.cuisineId) || cuisine.length === 0
    )
    .map((session) => <SessionItem key={session.id} session={session} />);

  if (sessionLoading || recipeLoading || cuisineLoading)
    return (
      <div className={classes.root}>
        <CircularProgress />
      </div>
    );
  return (
    <div>
      <CuisineFilter cuisine={cuisine} setCuisine={setCuisine} />
      <SessionSearch />
      <div className={classes.root}>
        <GridList cellHeight={180} className={classes.gridList}>
          <GridListTile
            key="Subheader"
            cols={2}
            style={{ height: "auto" }}
          ></GridListTile>
          {SessionList}
        </GridList>
        <Grid item direction="row-reverse" justify="flex-start">
          {user && user.isChef ? (
            <IconButton component={Link} to="/sessions/new">
              <AddBox />
            </IconButton>
          ) : (
            ""
          )}
        </Grid>
      </div>
    </div>
  );
};
export default SessionList;
