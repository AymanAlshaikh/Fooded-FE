import React from "react";
import { style } from "./styles";
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
        className={classes.field}
        label="Search"
        margin="normal"
        variant="outlined"
        size="small"
        fullWidth
      />
    </div>
  );
};
export default Search;
