import { GridListTile, GridListTileBar, IconButton } from "@material-ui/core";
import { DeleteForever, DeleteForeverOutlined, Edit } from "@material-ui/icons";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteRecipe } from "../../../store/actions/recipeActions";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import { useStyles } from "../Styles";
import Lightbox from "react-lightbox-component";

export default function ImageItem({ recipe }) {
  const dispatch = useDispatch();
  const chefs = useSelector((state) => state.chefReducer.chef);
  const user = useSelector((state) => state.authReducer.user);
  let chef = null;
  if (user) {
    chef = chefs.find((chef) => chef.userId === user.id);
  }

  const classes = useStyles();
  const recipeSlug = recipe.slug;
  return (
    <div>
      <Link to={`/recipes/${recipeSlug}`}>
        <Lightbox
          images={[
            {
              src: recipe.image,
              title: recipe.name,
              //   description: 'image description'
            },
          ]}
        />
      </Link>
    </div>
  );
}
