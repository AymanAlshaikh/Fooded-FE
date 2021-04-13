import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import {
  CircularProgress,
  GridListTile,
  GridListTileBar,
  IconButton,
} from "@material-ui/core";
import { DeleteForeverOutlined, Edit, PostAdd } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { deleteSession } from "../../../store/actions/sessionActions";

export default function SessionItem({ session }) {
  const sessionId = session.id;
  const history = useHistory();
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipeReducer.recipe);
  const recipe = recipes.find((recipe) => recipe.id === session.recipeId);
  const recipeLoading = useSelector((state) => state.recipeReducer.loading);
  const user = useSelector((state) => state.authReducer.user);
  const chefs = useSelector((state) => state.chefReducer.chef);

  let chef;
  if (user) {
    chef = chefs.find((chef) => chef.userId === user.id);
  }
  if (recipeLoading)
    return (
      <div>
        <CircularProgress />
      </div>
    );
  return (
    <Link to={`/sessions/${sessionId}`}>
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
              {`Date: ${session.date} `}
              {` Time: ${session.time} `}
              Duration:{" "}
              {recipe.duration <= 60
                ? `${recipe.duration} Minutes`
                : `${timeConvert(recipe.duration)}`}
            </span>
          }
          actionIcon={
            <div>
              {user && (
                <Link to={`sessions/${sessionId}/booking`}>
                  <IconButton>
                    <PostAdd />
                  </IconButton>
                </Link>
              )}
              {user && user.isChef && recipe.chefId === chef.id ? (
                <div>
                  <Link to={`/sessions/${sessionId}/edit`}>
                    <IconButton>
                      <Edit />
                    </IconButton>
                  </Link>
                  <IconButton
                    onClick={() =>
                      dispatch(
                        deleteSession(sessionId, recipe.id, chef, history)
                      )
                    }
                  >
                    <DeleteForeverOutlined />
                  </IconButton>
                </div>
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
