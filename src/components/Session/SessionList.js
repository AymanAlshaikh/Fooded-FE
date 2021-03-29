import { useSelector } from "react-redux";
import SessionItem from "./SessionItem";

import React, { useState } from "react";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ListSubheader from "@material-ui/core/ListSubheader";
import { useStyles } from "./Styles";
import { CircularProgress } from "@material-ui/core";
// import ChefSearch from "./ChefSearch";

const SessionList = () => {
  const [search, setSearch] = useState("");
  const classes = useStyles();
  const sessions = useSelector((state) => state.sessionReducer.session);
  const sessionLoading = useSelector((state) => state.sessionReducer.loading);

  const SessionList = sessions
    // .filter((chef) =>
    //   chef.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    // )
    .map((session) => <SessionItem key={session.id} session={session} />);

  if (!sessions || sessionLoading) return <CircularProgress />;
  return (
    <div>
      {/* <ChefSearch setSearch={setSearch} /> */}
      <div className={classes.root}>
        <GridList cellHeight={180} className={classes.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
            <ListSubheader component="div">Session</ListSubheader>
          </GridListTile>
          {SessionList}
        </GridList>
      </div>
    </div>
  );
};
export default SessionList;
