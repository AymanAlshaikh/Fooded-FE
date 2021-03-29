import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
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
import Copyright from "../Authentication/Copyright";
// Actions
import { updateUser } from "../../store/actions/authActions";
import { useStyles } from "./Styles";
import { CircularProgress } from "@material-ui/core";

// eslint-disable-next-line
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

<Copyright />;

const UserProfile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.authReducer.user);
  const loading = useSelector((state) => state.authReducer.loading);
  let preloadedValues = {};
  console.log(user);
  if (user) {
    preloadedValues = {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      house: user.house,
      road: user.road,
      block: user.block,
      city: user.city,
    };
  }

  const { handleSubmit, errors, register } = useForm({
    defaultValues: preloadedValues,
  });

  const onSubmit = (data) => {
    dispatch(updateUser(data, history));
    history.replace("/");
  };

  const classes = useStyles();

  if (loading) return <CircularProgress />;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          User Profile
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
                name="username"
                // variant="normal"
                fullWidth
                id="username"
                label="Username"
                required
                inputRef={register({ required: true })}
                autoFocus
              />
              {errors.username && <p>username is required</p>}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                // variant="normal"
                required
                fullWidth
                id="firstName"
                label="First Name"
                inputRef={register({ required: true })}
                autoFocus
              />
              {errors.firstName && <p>first name is required</p>}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                // variant="normal"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                inputRef={register({ required: true })}
              />
              {errors.lastName && <p>last name is required</p>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                // variant="outlined"
                required
                fullWidth
                id="phoneNumber"
                label="Phone Number"
                name="phoneNumber"
                autoComplete="phonenumber"
                inputRef={register({ required: true })}
              />
              {errors.phoneNumber && <p>phone number is required</p>}
            </Grid>
            <Grid item xs={4}>
              <TextField
                // variant="outlined"
                required
                fullWidth
                id="house"
                label="House"
                name="house"
                inputRef={register({ required: true })}
              />
              {errors.house && <p>house number is required</p>}
            </Grid>
            <Grid item xs={4}>
              <TextField
                // variant="outlined"
                required
                fullWidth
                id="road"
                label="Road"
                name="road"
                autoComplete="email"
                inputRef={register({ required: true })}
              />
              {errors.road && <p>road number is required</p>}
            </Grid>
            <Grid item xs={4}>
              <TextField
                // variant="outlined"
                required
                fullWidth
                name="block"
                id="block"
                label="Block"
                autoComplete="email"
                inputRef={register({ required: true })}
              />
              {errors.block && <p>block number is required</p>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                // variant="outlined"
                required
                fullWidth
                id="city"
                label="City"
                name="city"
                inputRef={register({ required: true })}
              />
              {errors.city && <p>city is required</p>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                // variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                inputRef={register({ required: true, pattern: EMAIL_REGEX })}
              />
              {errors.email && errors.email.type === "required" && (
                <p>email is required</p>
              )}
              {errors.email && errors.email.type === "pattern" && (
                <p>Wrong email</p>
              )}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Save Changes
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
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default UserProfile;
