import { useSelector } from "react-redux";
import ChefItem from "./ChefItem";

import React, { useState } from "react";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ListSubheader from "@material-ui/core/ListSubheader";
import { useStyles } from "./Styles";
import { CircularProgress } from "@material-ui/core";
import ChefSearch from "../Search";

const ChefList = () => {
  const [search, setSearch] = useState("");
  const classes = useStyles();
  const chefs = useSelector((state) => state.chefReducer.chef);
  const chefLoading = useSelector((state) => state.chefReducer.loading);
  const userLoading = useSelector((state) => state.userReducer.loading);
  const chefList = chefs
    .filter((chef) =>
      chef.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    )
    .map((chef) => <ChefItem key={chef.id} chef={chef} />);

  if (chefLoading || userLoading) return <CircularProgress />;
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
