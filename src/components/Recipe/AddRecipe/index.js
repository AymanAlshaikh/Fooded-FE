import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { addRecipe, updateRecipe } from "../../../store/actions/recipeActions";
import { useStyles } from "./styles";

import Link1 from "@material-ui/core/Link";
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
  console.log(cuisines);
  const cuisineOptions = cuisines.map((cuisine) => (
    <option value={cuisine.id}>{cuisine.name}</option>
  ));

  let preloadedValues = {};

  if (recipe) {
    preloadedValues = {
      name: recipe.name,
      description: recipe.description,
      ingredientDescription: recipe.ingredientDescription,
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
      dispatch(updateRecipe(data, image, chefId, recipe));
      history.replace("/recipes");
    } else {
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
            <Grid item xs={12} sm={12}>
              <TextField
                required
                fullWidth
                id="ingredientDescription"
                label="Ingredients"
                name="ingredientDescription"
                inputRef={register({ required: true })}
              />
              {errors.ingredientDescription && <p>Ingredients are required</p>}
            </Grid>

            <Grid item xs={12}>
              <TextField
                type="file"
                fullWidth
                id="image"
                label="Recipe Image"
                name="image"
                onChange={handleImage}
              />
              {errors.image && <p>Recipe Image is required</p>}
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl className={classes.margin}>
                <InputLabel htmlFor="demo-customized-select-native">
                  Cuisine
                </InputLabel>
                <NativeSelect
                  id="cuisineId"
                  name="cuisineId"
                  inputRef={register({ required: true })}
                >
                  {cuisineOptions}
                </NativeSelect>
              </FormControl>
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
