import React from "react";
import { useStyles } from "./styles";

const Page404 = () => {
  const classes = useStyles();
  const videoSource = "https://youtu.be/fXLicO0CRvk?t=14";

  return (
    <div className={classes.root}>
      <video className={classes.video} autoPlay loop>
        <source src={videoSource} type="video/webm" />
      </video>
      <div className={classes.content}>
        <h3>Ooops!!</h3>
      </div>
    </div>
  );
};

export default Page404;
