import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  addSession,
  updateSession,
} from "../../../store/actions/sessionActions";
import { useStyles } from "./styles";

import {
  CssBaseline,
  CircularProgress,
  FormControl,
  InputLabel,
  NativeSelect,
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Avatar,
} from "@material-ui/core";
import { ScheduleRounded } from "@material-ui/icons";
import moment from "moment";

const AddSession = () => {
  const classes = useStyles();
  const { sessionId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const sessions = useSelector((state) => state.sessionReducer.session);
  const sessionLoading = useSelector((state) => state.sessionReducer.loading);
  const recipes = useSelector((state) => state.recipeReducer.recipe);
  const recipeLoading = useSelector((state) => state.recipeReducer.loading);
  const chefs = useSelector((state) => state.chefReducer.chef);
  const chefLoading = useSelector((state) => state.chefReducer.loading);
  const user = useSelector((state) => state.authReducer.user);
  const userLoading = useSelector((state) => state.authReducer.loading);
  const currentChef = chefs.find((chef) => chef.userId === user.id);
  const chefRecipes = recipes.filter(
    (recipe) => recipe.chefId === currentChef.id
  );

  const recipeOptions = chefRecipes.map((recipe) => (
    <option value={recipe.id}>{recipe.name}</option>
  ));

  let preloadedValues = {};

  const session = sessions.find((sesion) => sesion.id === +sessionId);
  let recipe = null;
  let chef = null;
  let chefId = null;
  let recipeId = null;

  const [date, setDate] = useState(session ? session.date : "");
  if (session) {
    recipe = recipes.find((recipe) => recipe.id === session.recipeId);
    chef = chefs.find((chef) => chef.id === recipe.chefId);
    recipeId = recipe.id;
    chefId = chef.id;
    preloadedValues = {
      date: date,
      time: session.time,
      recipeId: session.recipeId,
    };
  }

  const { handleSubmit, errors, register } = useForm({
    defaultValues: preloadedValues,
  });
  if (!user) {
    return <Redirect to="/sessions" />;
  }
  if (user) {
    if (
      user.isChef === false ||
      (session && recipe.chefId !== currentChef.id)
    ) {
      return <Redirect to="/sessions" />;
    }
  }
  if (recipeLoading || sessionLoading || chefLoading || userLoading)
    return <CircularProgress />;

  const onSubmit = (data) => {
    if (session) {
      dispatch(updateSession(data, currentChef, recipeId, session));
      history.replace("/sessions");
    } else {
      console.log(data);
      dispatch(addSession(data, currentChef));
      history.replace("/sessions");
    }
  };
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const checkDate = async (value) => {
    value = date;
    await sleep(1000);
    if (value <= moment().format()) {
      return false;
    } else return true;
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
                name="time"
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
                name="date"
                required
                fullWidth
                id="date"
                onChange={(event) =>
                  event.target.value < new Date(moment().format("yyyy-MM-dd"))
                    ? alert("Invalid Date")
                    : setDate(event.target.value)
                }
                label="Session Date"
                inputRef={register({ required: true, validate: checkDate })}
                autoFocus
              />
              {errors.date && <p>Date is required</p>}
              {errors.date && errors.date.type === "validate" && (
                <p>Invalid Date</p>
              )}
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
        </form>
      </div>
      <Box mt={5}></Box>
    </Container>
  );
};

export default AddSession;
