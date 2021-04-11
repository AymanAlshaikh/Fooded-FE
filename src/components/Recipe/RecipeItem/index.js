import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteRecipe,
  fetchRecipes,
} from "../../../store/actions/recipeActions";
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

  const chefs = useSelector((state) => state.chefReducer.chef);
  const user = useSelector((state) => state.authReducer.user);
  let chef = null;
  if (user) {
    chef = chefs.find((chef) => chef.userId === user.id);
  }
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
          subheader="Chef (...)"
        />

        {/* <CardContent></CardContent> */}
        <Typography
          className={classes.info}
          color="textSecondary"
          variant="subtitle2"
        >
          Cuisine: (...)
          <br />
          Duration: (...)
        </Typography>
        {/* <Grid
        container
        direction="row-reverse"
        justify="flex-start"
        className={classes.button}
      >
        <Button component={Link} size="medium" to={`/recipes/${recipeSlug}`}>
          Learn More &gt;&gt;
        </Button>
      </Grid> */}
      </Card>
    </ButtonBase>
  );
}
