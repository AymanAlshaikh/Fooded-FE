import React from "react";
import { useSelector } from "react-redux";
import { Redirect, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useStyles } from "./styles";
import { deleteRecipe } from "../../../store/actions/recipeActions";
import {
  IconButton,
  Card,
  CardContent,
  CardMedia,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core/";
import { MoreVert } from "@material-ui/icons";
import { useDispatch } from "react-redux";

export default function RecipeDetail() {
  const classes = useStyles();
  const { recipeSlug } = useParams();
  const dispatch = useDispatch();
  const recipe = useSelector((state) =>
    state.recipeReducer.recipe.find((recipe) => recipe.slug === recipeSlug)
  );

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
  if (!recipe) return <Redirect to="/recipes" />;
  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={recipe.image}
        title={recipe.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {recipe.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Description: {recipe.description}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Ingredients: {recipe.ingredientDescription}
        </Typography>
      </CardContent>
      {user && user.isChef && chef.id === recipe.chefId ? (
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
            <MenuItem component={Link} to={`/recipes/${recipeSlug}/edit`}>
              Edit
            </MenuItem>
            <MenuItem onClick={() => dispatch(deleteRecipe(recipe.id, chef))}>
              Delete
            </MenuItem>
          </Menu>{" "}
        </>
      ) : (
        ""
      )}
    </Card>
  );
}
