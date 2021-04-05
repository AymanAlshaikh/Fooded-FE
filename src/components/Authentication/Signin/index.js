import React from "react";
import { signin } from "../../../store/actions/authActions";
import { useStyles } from "./styles";
import { useForm } from "react-hook-form";
import { useHistory, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Link1 from "@material-ui/core/Link";
import {
  CssBaseline,
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Container,
} from "@material-ui/core/";

export default function SignIn() {
  const classes = useStyles();
  const { errors, register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (data, event) => {
    event.preventDefault();
    dispatch(signin(data, history));
  };

  return (
    <Container component="main" maxWidth="xs" onSubmit={handleSubmit(onSubmit)}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <Grid item xs={12} sm={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="username"
              name="username"
              autoFocus
              inputRef={register({ required: true })}
            />
            {errors.username && <p>username is required</p>}
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              inputRef={register({ required: true })}
            />
            {errors.password && <p>password is required</p>}
          </Grid>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/signup">
                <Link1>Don't have an account? Sign Up</Link1>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}></Box>
    </Container>
  );
}
