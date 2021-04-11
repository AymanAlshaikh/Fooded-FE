import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  footer: {
    marginTop: 5,
    paddingTop: 10,
    paddingBottom: 8,
    backgroundColor: theme.palette.primary.main,
    bottom: 0,
    width: "100%",
  },
  text: {
    color: theme.palette.text.secondary,
    variant: "body2",
  },
}));
