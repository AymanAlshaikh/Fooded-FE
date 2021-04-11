import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    minWidth: 250,
    backgroundColor: theme.palette.secondary.dark,
    margin: 25,
    border: 6,
    borderRadius: 30,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 0,
    boxShadow: "1px 4px 6px 3px rgba(177, 146, 128, 1)",
    color: "#f8ece2",
  },
  paper: {
    backgroundColor: theme.palette.secondary.dark,
    padding: theme.spacing(1),
    margin: 10,
    borderRadius: 25,
    boxShadow: "1px 4px 6px 3px rgba(177, 146, 128, 1)",
    display: "flex",
    "& > *": {
      margin: theme.spacing(2),
      width: theme.spacing(20),
      height: theme.spacing(20),
    },
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
  },
  text: {
    textAlign: "left",
    color: "#f8ece2",
  },
  media: {
    // paddingTop: "100%", // 16:9
    // paddingTop: "42.85%", // 21:9
    // paddingTop: "42.55%", // 2.35:1
    // margin: "-70px auto 0",
    // justify: "auto",
    margin: "2.5% auto",
    width: "95%",
    height: 240,
    borderRadius: 25,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 0,
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)",
    position: "relative",
    // zIndex: 5000,
  },
}));
