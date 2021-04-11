import { makeStyles, withStyles } from "@material-ui/core";
import MuiListItem from "@material-ui/core/ListItem";

export const useStyles = makeStyles((theme) => ({
  icon: {
    backgroundColor: theme.palette.primary.main,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 250,
  },
}));

export const ListItem = withStyles((theme) => ({
  root: {
    "&$selected": {
      backgroundColor: theme.palette.primary.light,
      color: "white",
    },
    "&$selected:hover": {
      backgroundColor: theme.palette.primary.main,
      color: "white",
    },
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
      color: "white",
    },
  },
  selected: {},
}))(MuiListItem);
