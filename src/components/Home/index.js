import { IconButton } from "@material-ui/core";
import { PersonPin } from "@material-ui/icons";
import React from "react";
import { useStyles } from "./styles";
import { Link } from "react-router-dom";
//  <a href="https://www.freepik.com/photos/background">Background photo created by valeria_aksakova - www.freepik.com</a>

const Home = () => {
  const classes = useStyles();
  const videoSource =
    "https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_1280_10MG.mp4";

  return (
    <div className={classes.root}>
      <video className={classes.video} autoPlay muted loop>
        <source src={videoSource} type="video/mp4" />
      </video>
      <div className={classes.content}>
        <h3>Welcome To FoodED</h3>
        <IconButton component={Link} to="/signup">
          <PersonPin />
        </IconButton>
      </div>
    </div>
  );
};

export default Home;
