import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ChefSearch from "../../Search";
import CuisineItem from "../CuisineItem";
import { useStyles } from "./styles";

import {
  CircularProgress,
  GridList,
  GridListTile,
  ListSubheader,
} from "@material-ui/core/";
import { Add } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { fetchCuisines } from "../../../store/actions/cuisineActions";
import { useEffect } from "react";
const CuisineList = ({ chefRecipe }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const classes = useStyles();
  const cuisines = useSelector((state) => state.cuisineReducer.cuisine);
  const cuisineLoading = useSelector((state) => state.cuisineReducer.loading);
  useEffect(() => {
    if (cuisineLoading) dispatch(fetchCuisines());
  });

  const user = useSelector((state) => state.authReducer.user);
  let cuisineList = cuisines
    .filter((cuisine) =>
      cuisine.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    )
    .map((cuisine) => <CuisineItem key={cuisine.id} cuisine={cuisine} />);

  if (cuisineLoading) return <CircularProgress />;
  return (
    <div>
      <ChefSearch setSearch={setSearch} />
      <div className={classes.root}>
        <GridList cellHeight={180} className={classes.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
            <ListSubheader component="div">Cuisine</ListSubheader>
          </GridListTile>
          {cuisineList}
        </GridList>
        {/* {user && user.isChef ? (
          <Link to="/cuisines/new">
            <Add />
          </Link>
        ) : (
          ""
        )} */}
      </div>
    </div>
  );
};
export default CuisineList;
