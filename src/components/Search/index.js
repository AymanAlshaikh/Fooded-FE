import React from "react";
import TextField from "@material-ui/core/TextField";
import { style } from "./Styles";

const Search = ({ setSearch }) => {
  const classes = style();

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className={classes.center}>
      <TextField
        onChange={handleChange}
        label="Search"
        margin="normal"
        variant="outlined"
      />
    </div>
  );
};
export default Search;
