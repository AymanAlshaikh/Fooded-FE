import React from "react";
import { style } from "./Styles";
import { TextField } from "@material-ui/core/";

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
