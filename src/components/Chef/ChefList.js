import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchChefs } from "../../store/actions/chefActions";
import ChefItem from "./ChefItem";

import React from "react";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ListSubheader from "@material-ui/core/ListSubheader";
import { useStyles } from "./Styles";
import Search from "../Search";

const ChefList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  dispatch(fetchChefs);
  const chefs = useSelector((state) => state.chefReducer.chef);
  const chefList = chefs.map((chef) => <ChefItem key={chef.id} chef={chef} />);

  return (
    <div>
      <Search />
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
