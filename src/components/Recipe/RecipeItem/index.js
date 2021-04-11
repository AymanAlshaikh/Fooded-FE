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
<<<<<<< HEAD
    <div>
      <Link to={`/recipes/${recipeSlug}`}>
        <GridListTile key={recipe.image}>
          <img
            src={recipe.image}
            alt={recipe.name}
            style={{ height: 500, width: 500 }}
          />
          <GridListTileBar
            title={recipe.name}
            subtitle={<span> {recipe.description}</span>}
            actionIcon={
              user && user.isChef && recipe.chefId === chef.id ? (
                <div>
                  <Link to={`/recipes/${recipeSlug}/edit`}>
                    <IconButton>
                      <Edit />
                    </IconButton>
                  </Link>

                  <IconButton
                    onClick={() => dispatch(deleteRecipe(recipe.id, chef))}
                  >
                    <DeleteForeverOutlined />
                  </IconButton>
                </div>
              ) : (
                ""
              )
            }
          />
        </GridListTile>
      </Link>
    </div>
=======
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
>>>>>>> 3f4372bb8b6f6fda53680d94c473082f29f4144c
  );
}
