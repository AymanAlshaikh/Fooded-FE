import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

export default function CuisineFilter({ setCuisine, cuisine }) {
  const cuisines = useSelector((state) => state.cuisineReducer.cuisine);
  const cuisinesLoading = useSelector((state) => state.cuisineReducer.loading);
  const classes = useStyles();
  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
  });

  const handleChange = (event) => {
    setCuisine([...cuisine, event.target.value]);
    // setCuisine({ ...cuisine, [event.target.name]: event.target.checked });
  };

  const { gilad, jason, antoine } = state;
  //   const error = [gilad, jason, antoine].filter((v) => v).length !== 2;

  const cuisineIds = cuisines.map((cuisine) => (
    <FormControlLabel
      control={
        <Checkbox
          value={cuisine.id}
          //   checked={cuisine.id}
          onChange={handleChange}
          name={cuisine.name}
        />
      }
      label={cuisine.name}
    />
  ));
  const cuisineNames = cuisines.map((cuisine) => cuisine.name);
  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Assign responsibility</FormLabel>
        <FormGroup>
          {cuisineIds}
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
        <FormHelperText>Be careful</FormHelperText>
      </FormControl>
    </div>
  );
}
