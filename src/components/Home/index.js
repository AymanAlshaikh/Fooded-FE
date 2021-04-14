import React from "react";
import { useStyles } from "./styles";
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
        <h3>Coming Soon</h3>
      </div>
    </div>
  );
};

export default Home;
