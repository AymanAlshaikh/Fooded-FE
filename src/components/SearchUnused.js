import React, { useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";
import { searchSession } from "../store/actions/sessionActions";
import { useDispatch } from "react-redux";
import moment from "moment";
//Date Picker imports
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
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
  const [search, setSearch] = useState("");
  const recipes = useSelector((state) =>
    state.recipeReducer.recipe.map((recipe) => recipe.name)
  );

  const classes = style();

  // console.log(search);
  // const handleSubmit = (event, date) => {
  //   let searchObj = {
  //     date: date,
  //   };
  // console.log(searchObj);
  // event.preventDefault();
  // dispatch(searchRecipe(searchObj)); // change the searchRecipe to searchSession
  // };

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

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
