import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    background: "black",
  },
  video: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    height: 780,
  },
  content: {
    textAlign: "center",
    padding: "10px",
    color: "white",
    fontSize: "1.3rem",
    display: "flex",
    position: "absolute",
    marginTop: 2,
  },
});
