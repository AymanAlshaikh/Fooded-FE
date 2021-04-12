import React from "react";
import navIcons from "../../images/navIcons.svg";
import { useStyles } from "./styles";

import { Typography, Container, Link, Grid } from "@material-ui/core/";

const CopyrightContent = () => {
  const classes = useStyles();
  return (
    <Grid container justify="center">
      <Typography className={classes.text} gutterBottom>
        {"Copyright © "}
        <Link
          color="inherit"
          target="_blank"
          href="https://www.youtube.com/watch?v=6rgqcPTm4UY&ab_channel=MemeMarket"
        >
          FoodED
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
        <img
          src={navIcons}
          alt={""}
          style={{ height: 25, marginTop: 5, marginBottom: -5 }}
        />
      </Typography>
    </Grid>
  );
};

export default function Copyright() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="sm" justify="center">
        <CopyrightContent />
      </Container>
    </footer>
  );
}
