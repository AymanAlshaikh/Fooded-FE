import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SessionSearch from "../Search";
import SessionItem from "../SessionItem";
import { useStyles } from "./styles";

import {
  CircularProgress,
  GridList,
  GridListTile,
  ListSubheader,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";

const SessionList = () => {
  const [search, setSearch] = useState("");
  const classes = useStyles();
  const sessions = useSelector((state) => state.sessionReducer.session);
  const sessionLoading = useSelector((state) => state.sessionReducer.loading);
  const user = useSelector((state) => state.authReducer.user);

  const SessionList = sessions.map((session) => (
    <SessionItem key={session.id} session={session} />
  ));

  if (!sessions || sessionLoading) return <CircularProgress />;
  return (
    <div>
      <SessionSearch setSearch={setSearch} />
      <div className={classes.root}>
        <GridList cellHeight={180} className={classes.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
            <ListSubheader component="div">Session</ListSubheader>
          </GridListTile>
          {SessionList}
        </GridList>
        {user && user.isChef ? (
          <Link to="/sessions/new">
            <Add />
          </Link>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
export default SessionList;
