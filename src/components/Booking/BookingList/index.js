import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ChefSearch from "../../Search";
import BookingItem from "../BookingItem";
import { useStyles } from "./styles";

import {
  CircularProgress,
  GridList,
  GridListTile,
  ListSubheader,
} from "@material-ui/core/";
import { Add } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { fetchBookings } from "../../../store/actions/bookingActions";
import { fetchUsers } from "../../../store/actions/userActions";
import { fetchSessions } from "../../../store/actions/sessionActions";
const BookingList = ({ sessionId }) => {
  const bookings = useSelector((state) => state.bookingReducer.bookings);
  const users = useSelector((state) => state.userReducer.users);
  const bookingsLoading = useSelector((state) => state.bookingReducer.loading);
  const usersLoading = useSelector((state) => state.userReducer.loading);
  const sessionLoading = useSelector((state) => state.sessionReducer.loading);
  const [search, setSearch] = useState("");
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    if (usersLoading || bookingsLoading || sessionLoading) {
      dispatch(fetchUsers());

      dispatch(fetchSessions());

      dispatch(fetchBookings());
    }
  }, {});

  const sessionBookings = bookings.filter(
    (booking) => booking.sessionId === +sessionId
  );

  let sessionUsers = sessionBookings.map((user) =>
    users.find((usr) => user.userId === usr.id)
  );

  if (usersLoading || bookingsLoading || sessionLoading)
    return <CircularProgress />;

  let userList = sessionUsers
    .filter(
      (user) =>
        user.firstName
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase()) ||
        user.lastName.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    )

    .map((user) => <BookingItem key={bookings.id} user={user} />);
  return (
    <div>
      <ChefSearch setSearch={setSearch} />
      {`${userList.length} Users Booked this session`}
      <div className={classes.root}>
        <GridList cellHeight={180} className={classes.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
            <ListSubheader component="div">Users</ListSubheader>
          </GridListTile>
          {userList}
        </GridList>
        {/* {user && user.isChef ? (
          <Link to="/users/new">
            <Add />
          </Link>
        ) : (
          ""
        )} */}
      </div>
    </div>
  );
};
export default BookingList;
