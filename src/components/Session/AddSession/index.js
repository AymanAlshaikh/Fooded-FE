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
// Actions
import { useStyles } from "./Styles";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  NativeSelect,
} from "@material-ui/core";
import { Fastfood, ScheduleRounded } from "@material-ui/icons";
import {
  addSession,
  updateSession,
} from "../../../store/actions/sessionActions";

// eslint-disable-next-line
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const AddSession = () => {
  const classes = useStyles();
  const { sessionId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const sessions = useSelector((state) => state.sessionReducer.session);

  const sessionLoading = useSelector((state) => state.sessionReducer.loading);

  //recipe
  const recipes = useSelector((state) => state.recipeReducer.recipe);
  const recipeLoading = useSelector((state) => state.recipeReducer.loading);
  console.log(recipes);
  const chefs = useSelector((state) => state.chefReducer.chef);
  const chefLoading = useSelector((state) => state.chefReducer.loading);
  const user = useSelector((state) => state.authReducer.user);
  const userLoading = useSelector((state) => state.authReducer.loading);
  const currentChef = chefs.find((chef) => chef.userId === user.id);
  const chefRecipes = recipes.filter(
    (recipe) => recipe.chefId === currentChef.id
  );
  console.log(chefRecipes);

  const recipeOptions = chefRecipes.map((recipe) => (
    <option value={recipe.id}>{recipe.name}</option>
  ));

  let preloadedValues = {};

  const session = sessions.find((session) => session.id === sessionId);
  let recipe = null;
  let chef = null;
  let chefId = null;
  let recipeId = null;
  if (session) {
    recipe = recipes.find((recipe) => recipe.id === session.recipeId);
    chef = chefs.find((chef) => chef.id === recipe.chefId);
    recipeId = recipe.id;
    chefId = chef.id;
    preloadedValues = {
      date: session.name,
      time: session.time,
    };
  }
  const { handleSubmit, errors, register } = useForm({
    defaultValues: preloadedValues,
  });
  if (!user) {
    return <Redirect to="/sessions" />;
  }
  if (user) {
    if (user.isChef === false) {
      return <Redirect to="/sessions" />;
    }
  }
  if (recipeLoading || sessionLoading || chefLoading || userLoading)
    return <CircularProgress />;

  const onSubmit = (data) => {
    if (session) {
      dispatch(updateSession(data, recipeId, session, chefId));
      history.replace("/sessions");
    } else {
      dispatch(addSession(data, currentChef));
      history.replace("/sessions");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <ScheduleRounded />
        </Avatar>
        <Typography component="h1" variant="h5">
          {session ? "Update Session" : "New Session"}
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                type="time"
                autoComplete="fname"
                name="time"
                // variant="normal"
                fullWidth
                id="time"
                label="Session Time"
                required
                inputRef={register({ required: true })}
                autoFocus
              />
              {errors.time && <p>time is required</p>}
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                type="date"
                autoComplete="fname"
                name="date"
                // variant="normal"
                required
                fullWidth
                id="date"
                label="Session Date"
                inputRef={register({ required: true })}
                autoFocus
              />
              {errors.date && <p>Date is required</p>}
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl className={classes.margin}>
                <InputLabel htmlFor="demo-customized-select-native">
                  Recipes
                </InputLabel>
                <NativeSelect
                  id="recipeId"
                  name="recipeId"
                  inputRef={register({ required: true })}
                >
                  {recipeOptions}
                </NativeSelect>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                type="text"
                autoComplete="fname"
                name="zoom"
                // variant="normal"
                required
                fullWidth
                id="zoom"
                label="Session Zoom Link"
                inputRef={register({ required: true })}
                autoFocus
              />
              {errors.zoom && <p>Zoom Link is required</p>}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {session ? "Update" : "ADD"}
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

export default AddSession;
