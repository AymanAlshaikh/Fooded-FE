import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 400,
    backgroundColor: theme.palette.secondary.dark,
    margin: 20,
    border: 2,
    borderRadius: 25,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 0,
    boxShadow: "1px 4px 6px 3px rgba(177, 146, 128, 1)",
    color: "#f8ece2",
  },
  info: {
    paddingLeft: "0.9em",
    // paddingTop: "0.9em",
    paddingBottom: "0.9em",
    color: "#f8ece2",
  },
  media: {
    // paddingTop: "100%", // 16:9
    // paddingTop: "42.85%", // 21:9
    // paddingTop: "42.55%", // 2.35:1
    // margin: "-70px auto 0",
    margin: "1.5% auto",
    width: "97%",
    height: 180,
    borderRadius: 25,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 0,
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)",
    zIndex: 2000,
  },
  text: {
    textAlign: "left",
    color: "#f8ece2",
  },
}));
