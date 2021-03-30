import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link1 from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
// Actions
import { signup } from "../../../store/actions/authActions";
import { useStyles } from "../Signin/Styles";

// eslint-disable-next-line
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Signup = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { handleSubmit, errors, register } = useForm();

  const onSubmit = (data) => {
    dispatch(signup(data, history));
    console.log(data);
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
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
                autoComplete="email"
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
                id="block"
                label="Block"
                name="block"
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
                autoComplete="email"
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
            <Grid item xs={12}>
              <TextField
                // variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={register({
                  required: true,
                  minLength: 6,
                  maxLength: 12,
                })}
              />
              {errors.password && errors.password.type === "required" && (
                <p>password is required</p>
              )}
              {errors.password && errors.password.type === "minLength" && (
                <p>password has to be 6 characters</p>
              )}
              {errors.password && errors.password.type === "maxLength" && (
                <p>password can't be longer than 12 characters</p>
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
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/signin">
                <Link1 variant="body2">Already have an account? Sign in</Link1>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}></Box>
    </Container>
  );
};

export default Signup;
