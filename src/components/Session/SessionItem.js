import {
  CircularProgress,
  GridListTile,
  GridListTileBar,
  IconButton,
} from "@material-ui/core";
import { PostAdd } from "@material-ui/icons";
import InfoIcon from "@material-ui/icons/Info";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { booking } from "../../store/actions/bookingActions";

import { useStyles } from "./Styles";

export default function SessionItem({ session }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  // const recipeSlug = recipe.slug;
  const recipes = useSelector((state) => state.recipeReducer.recipe);
  const recipe = recipes.find((recipe) => recipe.id === session.recipeId);
  const loading = useSelector((state) => state.recipeReducer.loading);

  const handleBook = () => {
    const bookSession = { sessionId: session.id };
    console.log("handlebook", bookSession);
    dispatch(booking(bookSession));
  };

  if (loading) return <CircularProgress />;
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
            <Link to={`sessions/${session.id}/booking`}>
              <IconButton
                aria-label={`info about ${recipe.name}`}
                className={classes.icon}
                // onClick={handleBook}
              >
                <PostAdd />
              </IconButton>
            </Link>
          }
        />
      </GridListTile>
    </Link>
  );
}
