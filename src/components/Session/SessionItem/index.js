import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useStyles } from "./styles";

import {
  CircularProgress,
  GridListTile,
  GridListTileBar,
  IconButton,
} from "@material-ui/core";
import { Edit, PostAdd } from "@material-ui/icons";

export default function SessionItem({ session }) {
  const sessionId = session.id;

  const recipes = useSelector((state) => state.recipeReducer.recipe);
  const recipe = recipes.find((recipe) => recipe.id === session.recipeId);
  const recipeLoading = useSelector((state) => state.recipeReducer.loading);
  const userLoading = useSelector((state) => state.authReducer.loading);
  const chefLoading = useSelector((state) => state.chefReducer.loading);
  const user = useSelector((state) => state.authReducer.user);
  const chefs = useSelector((state) => state.chefReducer.chef);
  let chef;
  if (user) {
    chef = chefs.find((chef) => chef.userId === user.id);
  }

  if (!recipe || recipeLoading || userLoading || chefLoading)
    return <CircularProgress />;
  return (
    <Link to={`/sessions/${session.id}`}>
      <GridListTile key={recipe.image}>
        <img
          src={recipe.image}
          alt={recipe.name}
          style={{ height: 500, width: 500 }}
        />
        <GridListTileBar
          title={recipe.name}
          subtitle={
            <span>
              {" "}
              {`Date: ${session.date}`} {`Time: ${session.time}`}
            </span>
          }
          actionIcon={
            <div>
              {user ? (
                <Link to={`sessions/${session.id}/booking`}>
                  <IconButton>
                    <PostAdd />
                  </IconButton>
                </Link>
              ) : (
                ""
              )}
              {user && user.isChef && recipe.chefId === chef.id ? (
                <Link to={`/sessions/${sessionId}/edit`}>
                  <IconButton>
                    <Edit />
                  </IconButton>
                </Link>
              ) : (
                ""
              )}
            </div>
          }
        />
      </GridListTile>
    </Link>
  );
}
