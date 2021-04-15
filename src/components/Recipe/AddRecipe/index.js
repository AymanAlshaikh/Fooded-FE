import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { addRecipe, updateRecipe } from "../../../store/actions/recipeActions";
import { useStyles } from "./styles";

import {
  CssBaseline,
  CircularProgress,
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  InputLabel,
  NativeSelect,
  FormControl,
} from "@material-ui/core";
import { Fastfood } from "@material-ui/icons";
import { fetchCuisines } from "../../../store/actions/cuisineActions";
import IngredientList from "../../ingredient/IngredientList";

const AddRecipe = () => {
  const classes = useStyles();
  const { recipeSlug } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const recipes = useSelector((state) => state.recipeReducer.recipe);
  const recipe = recipes.find((recipe) => recipe.slug === recipeSlug);
  const recipeLoading = useSelector((state) => state.recipeReducer.loading);
  const [image, setImage] = useState(recipe ? recipe.image : "");

  //chef & user
  const chefs = useSelector((state) => state.chefReducer.chef);
  const user = useSelector((state) => state.authReducer.user);
  const chef = chefs.find((chef) => chef.userId === user.id);
  const cuisines = useSelector((state) => state.cuisineReducer.cuisine);
  const userLoading = useSelector((state) => state.authReducer.loading);
  const cuisineLoading = useSelector((state) => state.cuisineReducer.loading);
  const chefLoading = useSelector((state) => state.chefReducer.loading);
  useEffect(() => {
    if (cuisineLoading) dispatch(fetchCuisines());
  });

  const cuisineOptions = cuisines.map((cuisine) => (
    <option key={cuisine.id} value={cuisine.id}>
      {cuisine.name}
    </option>
  ));
  //ingredients
  let ingredientPreLoad;
  if (recipe) {
    // gets the recipe's ingredients and coverts them into integers then assigns them to ingreientPreLoad
    ingredientPreLoad = recipe.ingredientDescription.split(",").map((x) => +x);
    console.log("ingredients pre load: ", ingredientPreLoad);
  }
  const [ingredients, setIngredients] = useState(
    recipe ? ingredientPreLoad : []
  );
  const _ingredients = useSelector(
    (state) => state.ingredientReducer.ingredients
  );
  let ingredientsNames;
  if (ingredients !== null) {
    const matchingIngredients = _ingredients.filter((ingrediant) =>
      ingredients.includes(ingrediant.id)
    );
    ingredientsNames = matchingIngredients.map(
      (ingredient_) => ` ${ingredient_.name}`
    );
  }

  let preloadedValues = {};

  if (recipe) {
    preloadedValues = {
      name: recipe.name,
      description: recipe.description,
      ingredientDescription: recipe.ingredientDescription,
      duration: recipe.duration,
    };
  }
  const { handleSubmit, errors, register } = useForm({
    defaultValues: preloadedValues,
  });
  if (!user || !user.isChef) {
    return <Redirect to="/recipes" />;
  }
  if (recipe) {
    if (recipe.chefId !== chef.id) {
      return <Redirect to="/recipes" />;
    }
  }
  if (chefLoading || userLoading || recipeLoading) return <CircularProgress />;

  const handleImage = (event) => setImage(event.target.files[0]);
  const chefId = chef.id;
  const onSubmit = (data) => {
    if (recipe) {
      data = {
        ...data,
        ingredientId: ingredients,
        ingredientDescription: ingredients.toString(),
      };
      dispatch(updateRecipe(data, image, chefId, recipe));
      history.replace("/recipes");
    } else {
      data = {
        ...data,
        ingredientId: ingredients,
        ingredientDescription: ingredients.toString(),
      };
      dispatch(addRecipe(data, image, chefId));
      history.replace("/recipes");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Fastfood />
        </Avatar>
        <Typography component="h1" variant="h5">
          {recipe ? "Update Recipe" : "New Recipe"}
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                name="name"
                fullWidth
                id="name"
                label="Recipe Name"
                required
                inputRef={register({ required: true })}
                autoFocus
              />
              {errors.name && <p>name is required</p>}
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                name="description"
                required
                fullWidth
                id="description"
                label="Recipe Description"
                inputRef={register({ required: true })}
                autoFocus
              />
              {errors.description && <p>Description is required</p>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                type="file"
                fullWidth
                id="image"
                label="Recipe Image"
                name="image"
                onChange={handleImage}
              />
              {errors.image && <p>Recipe Image is required</p>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                type="number"
                fullWidth
                id="duration"
                label="Recipe Duration"
                name="duration"
                inputRef={register({ required: true })}
              />
              {errors.duration && <p>Recipe Duration is required</p>}
            </Grid>
            <Grid item xs={12} sm={12}>
              <InputLabel htmlFor="demo-customized-select-native">
                Cuisine
              </InputLabel>
              <FormControl className={classes.margin}>
                <NativeSelect
                  required
                  id="cuisineId"
                  name="cuisineId"
                  inputRef={register({ required: true })}
                >
                  {cuisineOptions}
                </NativeSelect>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography variant="caption">Choose your ingredients</Typography>
              <br />
              <Typography variant="overline">
                {ingredients !== null &&
                  `Selected ingredients: ${ingredientsNames}`}
              </Typography>
              <IngredientList
                setIngredients={setIngredients}
                ingredients={ingredients}
              />
              {errors.ingredientDescription && <p>Ingredients are required</p>}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {recipe ? "Update" : "ADD"}
          </Button>
        </form>
      </div>
      <Box mt={5}></Box>
    </Container>
  );
};

export default AddRecipe;
