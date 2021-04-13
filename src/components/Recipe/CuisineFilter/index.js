import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { RestaurantMenuOutlined } from "@material-ui/icons";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

export default function CuisineFilter({ setCuisine, cuisine }) {
  const [refresh, setRefresh] = useState("");
  const cuisines = useSelector((state) => state.cuisineReducer.cuisine);
  const cuisinesLoading = useSelector((state) => state.cuisineReducer.loading);
  const classes = useStyles();

  const handleChange = (event) => {
    if (cuisine.includes(+event.target.value)) {
      for (let i = 0; i < cuisine.length; i++) {
        if (cuisine[i] === +event.target.value) {
          cuisine.splice(i, 1);
        }
      }
    } else {
      setCuisine([...cuisine, +event.target.value]);
    }
  };

  const handleClick = (event) => {
    setCuisine([]);

    window.location.reload();
  };

  const cuisineCheck = cuisines.map((cuisine) => (
    <FormControlLabel
      key={cuisine.id}
      control={
        <Checkbox
          checkedIcon={<RestaurantMenuOutlined />}
          value={cuisine.id}
          onChange={handleChange}
          name={cuisine.name}
        />
      }
      label={cuisine.name}
    />
  ));

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Select Cuisine</FormLabel>

        <FormGroup>
          {cuisineCheck}
          {/* <FormControlLabel
            control={
              <Checkbox
              checked={cuisineIds}
              onChange={handleChange}
              name={cuisineNames}
              />
            }
            label={cuisineNames}
          /> */}
        </FormGroup>

        <Button onClick={handleClick}>Reset Cuisine</Button>
      </FormControl>
    </div>
  );
}
