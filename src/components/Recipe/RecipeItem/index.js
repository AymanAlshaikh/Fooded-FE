import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteRecipe,
  fetchRecipes,
} from "../../../store/actions/recipeActions";
import { useStyles } from "./styles";

import { GridListTile, GridListTileBar, IconButton } from "@material-ui/core";
import { DeleteForeverOutlined, Edit } from "@material-ui/icons";

export default function RecipeItem({ recipe }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const chefs = useSelector((state) => state.chefReducer.chef);
  const user = useSelector((state) => state.authReducer.user);
  let chef = null;
  if (user) {
    chef = chefs.find((chef) => chef.userId === user.id);
  }

  const recipeSlug = recipe.slug;
  return (
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
            }
          />
        </GridListTile>
      </Link>
    </div>
  );
}
