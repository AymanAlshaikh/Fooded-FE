import React, { useState } from "react";
import { useSelector } from "react-redux";
import ChefSearch from "../../Search";
import ChefItem from "../ChefItem";
import { useStyles } from "./styles";

import { CircularProgress, Grid } from "@material-ui/core";

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
    <Grid container className={classes.root}>
      <Grid container item justify="center">
        <Grid item>
          <ChefSearch setSearch={setSearch} />
        </Grid>
      </Grid>
      <Grid container item className={classes.root}>
        {chefList}
      </Grid>
    </Grid>
  );
};
export default ChefList;
