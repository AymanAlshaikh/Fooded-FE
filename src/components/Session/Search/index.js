import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchSession } from "../../../store/actions/sessionActions";
import { useStyles } from "./styles";

import moment from "moment";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const Search = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(moment().format("LLLL"));

  const handleDateChange = (date) => {
    setSelectedDate(date);
    date = moment(date).format("YYYY-MM-DD");
    let searchObj = {
      date: date,
    };
    dispatch(searchSession(searchObj));
  };

  return (
    <div className={classes.center}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Search by date"
          value={selectedDate}
          onChange={handleDateChange}
          defaultValue={selectedDate}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
};
export default Search;
