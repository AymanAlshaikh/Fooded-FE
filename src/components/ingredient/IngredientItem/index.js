import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useStyles } from "./styles";

import {
  CircularProgress,
  ButtonBase,
  Card,
  CardMedia,
  CardHeader,
} from "@material-ui/core";

export default function IngredientItem({
  ingredient,
  setIngredients,
  ingredients,
}) {
  const classes = useStyles();
  const loading = useSelector((state) => state.ingredientReducer.loading);

  const handleIngredientAdd = () => {
    if (ingredients === null) {
      setIngredients(ingredient.id);
      console.log(ingredients.lenght());
    } else if (ingredients.includes(ingredient.id)) {
      for (let i = 0; i < ingredients.length; i++) {
        if (ingredients[i] === ingredient.id) {
          ingredients.splice(i, 1);
        }
      }
    } else {
      setIngredients([...ingredients, ingredient.id]);
    }
  };
  if (loading) return <CircularProgress />;
  return (
    <ButtonBase component={Link} onClick={handleIngredientAdd}>
      <Card className={classes.root} variant="outlined">
        <CardMedia
          //   image={ingredient.image}
          className={classes.media}
          title={`${ingredient.name}`}
        />
        <CardHeader title={`${ingredient.name}`} />
      </Card>
    </ButtonBase>
  );
}
