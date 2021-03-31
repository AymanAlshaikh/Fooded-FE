import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link1 from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
// Actions
import { useStyles } from "./Styles";
import { CircularProgress } from "@material-ui/core";
import { addRecipe, updateRecipe } from "../../../store/actions/recipeActions";
import { Fastfood } from "@material-ui/icons";
// eslint-disable-next-line
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const AddRecipe = () => {
  const classes = useStyles();
  const [image, setImage] = useState("");
  const { recipeSlug } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const recipes = useSelector((state) => state.recipeReducer.recipe);
  const recipe = recipes.find((recipe) => recipe.slug === recipeSlug);
  const recipeLoading = useSelector((state) => state.recipeReducer.loading);

  //chef & user
  const chefs = useSelector((state) => state.chefReducer.chef);
  const user = useSelector((state) => state.authReducer.user);
  const chef = chefs.find((chef) => chef.userId === user.id);
  const userLoading = useSelector((state) => state.authReducer.loading);
  const chefLoading = useSelector((state) => state.chefReducer.loading);

  console.log(user);

  let preloadedValues = {};

  if (recipe) {
    preloadedValues = {
      name: recipe.name,
      description: recipe.description,
      ingredientDescription: recipe.ingredientDescription,
      image: "",
    };
  }
  const { handleSubmit, errors, register } = useForm({
    defaultValues: preloadedValues,
  });
  if (!user || !user.isChef || recipe.chefId !== chef.id)
    return <Redirect to="/recipes" />;
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
                autoComplete="fname"
                name="name"
                // variant="normal"
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
                autoComplete="fname"
                name="description"
                // variant="normal"
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
                // variant="normal"
                required
                fullWidth
                id="ingredientDescription"
                label="Ingredients"
                name="ingredientDescription"
                autoComplete="lname"
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
                inputRef={register({ required: true })}
              />
              {errors.image && <p>Recipe Image is required</p>}
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
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/signin">
                <Link1 variant="body2"></Link1>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}></Box>
    </Container>
  );
};

export default AddRecipe;
