import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { searchSession } from "../../../store/actions/sessionActions";
import { useDispatch } from "react-redux";
import moment from "moment";
//Date Picker imports
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const style = makeStyles({
  center: {
    justifyContent: "center",
    alighItem: "center",
    alignContent: "center",
    textAlign: "center",
  },
});
const Search = () => {
  const dispatch = useDispatch();
  const classes = style();
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
