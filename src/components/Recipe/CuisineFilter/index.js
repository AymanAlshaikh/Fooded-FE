import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useSelector } from "react-redux";
import { Button, Grid } from "@material-ui/core";
import { RestaurantMenuOutlined } from "@material-ui/icons";
import { useStyles } from "./styles";

export default function CuisineFilter({ setCuisine, cuisine }) {
  const cuisines = useSelector((state) => state.cuisineReducer.cuisine);

  const classes = useStyles();

  const handleChange = (event) => {
    if (cuisine.includes(+event.target.value)) {
      let cus = cuisine.filter((cuis) => cuis !== +event.target.value);
      setCuisine(cus);
    } else {
      setCuisine([...cuisine, +event.target.value]);
    }
  };

  const handleReset = () => {
    setCuisine([]);
  };

  const cuisineCheck = cuisines.map((_cuisine) => (
    <FormControlLabel
      key={_cuisine.id}
      control={
        <Checkbox
          checked={cuisine.includes(_cuisine.id)}
          checkedIcon={<RestaurantMenuOutlined />}
          value={_cuisine.id}
          onChange={handleChange}
          name={_cuisine.name}
        />
      }
      label={_cuisine.name}
    />
  ));

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Select Cuisine</FormLabel>

        <Grid>{cuisineCheck}</Grid>

        <Button color={"primary"} onClick={handleReset}>
          Reset Cuisine
        </Button>
      </FormControl>
    </div>
  );
}
