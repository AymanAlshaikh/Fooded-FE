import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteRecipe } from "../../../store/actions/recipeActions";
import { useStyles } from "./styles";

import {
  IconButton,
  Card,
  CardMedia,
  ButtonBase,
  Typography,
  CardHeader,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";

export default function RecipeItem({ recipe }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const cuisines = useSelector((state) => state.cuisineReducer.cuisine);
  const cuisine = cuisines.find((cuisine) => cuisine.id === recipe.cuisineId);
  const chefs = useSelector((state) => state.chefReducer.chef);
  const user = useSelector((state) => state.authReducer.user);
  let chef = null;
  if (user) {
    chef = chefs.find((chef) => chef.userId === user.id);
  }

  const recipeChef = chefs.find((chef) => chef.id === recipe.chefId);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const recipeSlug = recipe.slug;
  return (
    <ButtonBase component={Link} to={`/recipes/${recipeSlug}`}>
      <Card className={classes.root} variant="outlined">
        <CardMedia
          image={recipe.image}
          className={classes.media}
          title={recipe.name}
        />
        <CardHeader
          action={
            <div>
              {user && user.isChef ? (
                <>
                  <IconButton
                    aria-controls="chef-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    <MoreVert />
                  </IconButton>
                  <Menu
                    id="chef-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem
                      component={Link}
                      to={`/recipes/${recipeSlug}/edit`}
                    >
                      Edit
                    </MenuItem>
                    <MenuItem
                      onClick={() => dispatch(deleteRecipe(recipe.id, chef))}
                    >
                      Delete
                    </MenuItem>
                  </Menu>{" "}
                </>
              ) : (
                ""
              )}
            </div>
          }
          title={recipe.name}
          subheader={`By Chef ${recipeChef.name}`}
        />

        {/* <CardContent></CardContent> */}
        <Typography
          className={classes.info}
          color="textSecondary"
          variant="subtitle2"
        >
          Cuisine: {cuisine.name}
          <br />
          Duration:{" "}
          {recipe.duration <= 60
            ? `${recipe.duration} Minutes`
            : `${timeConvert(recipe.duration)}`}
        </Typography>
        {/* <Grid
          container
          direction="row-reverse"
          justify="flex-start"
          className={classes.button}
        > */}
        {/* <Button component={Link} size="medium" to={`/recipes/${recipeSlug}`}>
          Learn More &gt;&gt;
        </Button> */}
        {/* </Grid> */}
      </Card>
    </ButtonBase>
  );
}

function timeConvert(n) {
  let num = n;
  let hours = num / 60;
  let rhours = Math.floor(hours);
  let minutes = (hours - rhours) * 60;
  let rminutes = Math.round(minutes);
  if (rhours > 1) {
    if (rminutes > 1) {
      return rhours + " Hours and " + rminutes + " Minutes.";
    } else {
      return rhours + " Hours and " + rminutes + " Minute.";
    }
  } else {
    if (rminutes > 1) {
      return rhours + " Hour and " + rminutes + " Minutes.";
    } else {
      return rhours + " Hour and " + rminutes + " Minute.";
    }
  }
}
