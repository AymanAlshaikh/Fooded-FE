import { GridListTile, GridListTileBar, IconButton } from "@material-ui/core";
import { DeleteForever, DeleteForeverOutlined, Edit } from "@material-ui/icons";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteRecipe } from "../../../store/actions/recipeActions";

import { useStyles } from "../Styles";

export default function RecipeItem({ recipe }) {
  const dispatch = useDispatch();
  const chefs = useSelector((state) => state.chefReducer.chef);
  const user = useSelector((state) => state.authReducer.user);
  const chef = chefs.find((chef) => chef.userId === user.id);

  const classes = useStyles();
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
