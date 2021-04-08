import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ChefSearch from "../../Search";
import ChefItem from "../ChefItem";
import { useStyles } from "./styles";

import {
  CircularProgress,
  ListSubheader,
  GridListTile,
  GridList,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { fetchChefs } from "../../../store/actions/chefActions";

const ChefList = () => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const classes = useStyles();
  const chefs = useSelector((state) => state.chefReducer.chef);
  const chefLoading = useSelector((state) => state.chefReducer.loading);
  const userLoading = useSelector((state) => state.userReducer.loading);
  useEffect(() => {
    if (chefLoading) dispatch(fetchChefs());
  });
  const chefList = chefs
    .filter((chef) =>
      chef.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    )
    .map((chef) => <ChefItem key={chef.id} chef={chef} />);

  if (chefLoading || userLoading)
    return (
      <div className={classes.root}>
        <CircularProgress />;
      </div>
    );
  return (
    <div>
      <ChefSearch setSearch={setSearch} />
      <div className={classes.root}>
        <GridList cellHeight={180} className={classes.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
            <ListSubheader component="div">Chefs</ListSubheader>
          </GridListTile>
          {chefList}
        </GridList>
      </div>
    </div>
  );
};
export default ChefList;
