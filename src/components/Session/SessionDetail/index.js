import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router";
import { useStyles } from "./styles";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Typography,
  CircularProgress,
  IconButton,
} from "@material-ui/core/";
import BookingList from "../../Booking/BookingList";
import {
  deleteSession,
  fetchSessions,
} from "../../../store/actions/sessionActions";
import { fetchRecipes } from "../../../store/actions/recipeActions";
import { fetchChefs } from "../../../store/actions/chefActions";
import { DeleteForeverOutlined, Edit, PostAdd } from "@material-ui/icons";

export default function SessionDetail() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { sessionId } = useParams();
  const user = useSelector((state) => state.authReducer.user);
  const allSessions = useSelector((state) => state.sessionReducer.session);
  const allRecipes = useSelector((state) => state.recipeReducer.recipe);
  const allChefs = useSelector((state) => state.chefReducer.chef);
  const sessionLoading = useSelector((state) => state.sessionReducer.loading);
  const recipeLoading = useSelector((state) => state.recipeReducer.loading);
  const chefLoading = useSelector((state) => state.chefReducer.loading);
  useEffect(() => {
    if (sessionLoading || recipeLoading || chefLoading) {
      return (
        dispatch(fetchSessions()),
        dispatch(fetchRecipes()),
        dispatch(fetchChefs())
      );
    }
  }, {});
  if (sessionLoading || recipeLoading || chefLoading)
    return <CircularProgress />;
  const foundSession = allSessions.find((session) => session.id === +sessionId);
  console.log("foundSession", foundSession);

  const foundRecipe = allRecipes.find(
    (recipe) => recipe.id === foundSession.recipeId
  );

  const foundChef = allChefs.find((chef) => chef.id === foundRecipe.chefId);
  if (!foundSession) return <Redirect to="/sessions" />;
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={foundRecipe.image} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {`${foundRecipe.name} by ${foundChef.name}`}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Date: {foundSession.date}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Time: {foundSession.time}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Recipe Duration:{" "}
            {foundRecipe.duration <= 60
              ? `${foundRecipe.duration} Minutes`
              : `${timeConvert(foundRecipe.duration)}`}
          </Typography>
        </CardContent>
        {user && user.isChef && foundChef.userId === user.id ? (
          <div>
            <BookingList sessionId={sessionId} />
          </div>
        ) : (
          ""
        )}
      </CardActionArea>
      <div>
        {user && foundChef.userId !== user.id ? (
          <Link to={`sessions/${sessionId}/booking`}>
            <IconButton>
              <PostAdd />
            </IconButton>
          </Link>
        ) : (
          ""
        )}
      </div>
      <div>
        {user && user.isChef && foundChef.userId === user.id ? (
          <div>
            <Link to={`/sessions/${sessionId}/edit`}>
              <IconButton>
                <Edit />
              </IconButton>
            </Link>
            <IconButton
              onClick={() =>
                dispatch(
                  deleteSession(sessionId, foundRecipe.id, foundChef, history)
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
    </Card>
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
