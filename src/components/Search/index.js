import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useSelector } from "react-redux";
import { Button, makeStyles } from "@material-ui/core";
import { searchRecipe } from "../../store/actions/recipeActions";
import { useDispatch } from "react-redux";

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

  console.log(search);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(searchRecipe(search));
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={classes.center}>
        <Autocomplete
          container
          style={{ width: 300 }}
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          options={recipes}
          renderInput={(params) => (
            <TextField
              onChange={handleChange}
              {...params}
              label="Search Recipes"
              margin="normal"
              variant="outlined"
              InputProps={{ ...params.InputProps, type: "search" }}
              value={search}
            />
          )}
        />
      </div>
      <Button type="submit">SEARCH</Button>
    </form>
  );
};
export default Search;
