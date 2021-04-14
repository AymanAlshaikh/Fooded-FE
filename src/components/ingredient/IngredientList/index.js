import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ChefSearch from "../../Search";
import IngredientItem from "../IngredientItem";
import { useStyles } from "./styles";

import { useDispatch } from "react-redux";
import { fetchChefs } from "../../../store/actions/chefActions";
import { CircularProgress, Grid } from "@material-ui/core";

const IngredientList = ({ setIngredients, ingredients }) => {
  //   const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const classes = useStyles();
  const _ingredients = useSelector(
    (state) => state.ingredientReducer.ingredients
  );
  const ingredientLoading = useSelector(
    (state) => state.ingredientReducer.loading
  );
  //   const userLoading = useSelector((state) => state.userReducer.loading);
  //   useEffect(() => {
  //     if (chefLoading) dispatch(fetchChefs());
  //   });
  const ingredientList = _ingredients
    .filter((ingredient) =>
      ingredient.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    )
    .map((ingredient) => (
      <IngredientItem
        key={ingredient.id}
        ingredient={ingredient}
        setIngredients={setIngredients}
        ingredients={ingredients}
      />
    ));

  if (ingredientLoading)
    return (
      <div className={classes.root}>
        <CircularProgress />;
      </div>
    );
  return (
    <Grid container className={classes.root}>
      <Grid container item justify="center">
        <Grid item>
          <ChefSearch setSearch={setSearch} />
        </Grid>
      </Grid>
      <Grid container item className={classes.root}>
        {ingredientList}
      </Grid>
    </Grid>
  );
};
export default IngredientList;
