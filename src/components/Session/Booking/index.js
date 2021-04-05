import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useStyles } from "./styles";
import { CircularProgress } from "@material-ui/core";
import { Book } from "@material-ui/icons";
import { booking } from "../../../store/actions/bookingActions";

const Booking = () => {
  const classes = useStyles();
  const { sessionId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionLoading = useSelector((state) => state.sessionReducer.loading);
  const user = useSelector((state) => state.authReducer.user);
  const userLoading = useSelector((state) => state.authReducer.loading);
  let preloadedValues = {};

  const { handleSubmit, errors, register } = useForm({
    defaultValues: preloadedValues,
  });
  if (!user) {
    return <Redirect to="/sessions" />;
  }

  if (sessionLoading || userLoading) return <CircularProgress />;

  const onSubmit = (data) => {
    dispatch(booking(data, sessionId));
    history.replace("/");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Book />
        </Avatar>
        <Typography component="h1" variant="h5">
          Book a Session
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                type="number"
                autoComplete="fname"
                name="qty"
                fullWidth
                id="qty"
                label="Quantity"
                required
                inputRef={register({ required: true })}
                autoFocus
              />
              {errors.qty && <p>Quantity is required</p>}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Book
          </Button>
        </form>
      </div>
      <Box mt={5}></Box>
    </Container>
  );
};

export default Booking;
