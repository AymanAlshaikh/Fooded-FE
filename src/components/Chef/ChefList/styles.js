import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    // overflow: "hidden",
    // backgroundColor: theme.palette.background.paper,
    padding: 1,
  },
}));
