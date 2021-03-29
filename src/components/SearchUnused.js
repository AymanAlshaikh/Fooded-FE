import React, { useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";
// import { searchRecipe } from "../../store/actions/recipeActions";
import { useDispatch } from "react-redux";

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

  const [selectedDate, setSelectedDate] = useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
    let searchObj = {
      date: date,
    };
    console.log(date);
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
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
};
export default Search;
