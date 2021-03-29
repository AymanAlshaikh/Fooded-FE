import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useSelector } from "react-redux";
import { Button, makeStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { searchChef } from "../../store/actions/userActions";

const style = makeStyles({
  center: {
    justifyContent: "center",
    alighItem: "center",
    alignContent: "center",
    textAlign: "center",
  },
});
const ChefSearch = ({ setSearch }) => {
  const classes = style();

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className={classes.center}>
      <TextField
        onChange={handleChange}
        label="Search Chefs"
        margin="normal"
        variant="outlined"
      />
    </div>
  );
};
export default ChefSearch;
