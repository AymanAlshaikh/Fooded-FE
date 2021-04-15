import React from "react";
import { useStyles } from "./styles";
import bgv from "../../images/bgv.mp4";

//  <a href="https://www.freepik.com/photos/background">Background photo created by valeria_aksakova - www.freepik.com</a>

const Home = () => {
  const classes = useStyles();
  const videoSource = `${bgv}`;

  return (
    <div className={classes.root}>
      <video className={classes.video} autoPlay muted loop>
        <source src={videoSource} type="video/mp4" />
      </video>
      <div className={classes.content}>
        <h2>
          Welcome to the new era of food education <h1>at Home</h1>
        </h2>
      </div>
    </div>
  );
};

export default Home;
