import React from "react";
import { useStyles } from "./styles";

import { Typography, Container, Link } from "@material-ui/core/";

const CopyrightContent = () => {
  return (
    <Typography variant="body2" color="textSecondary">
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
    </Typography>
  );
};

export default function Copyright() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="sm">
        <CopyrightContent />
      </Container>
    </footer>
  );
}
