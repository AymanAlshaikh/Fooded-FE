import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router";
import { useStyles } from "./styles";
import { Link } from "react-router-dom";
import {
  Grid,
  Card,
  CardHeader,
  Menu,
  MenuItem,
  CardMedia,
  Typography,
  CircularProgress,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tooltip,
} from "@material-ui/core/";
import BookingList from "../../Booking/BookingList";
import {
  deleteSession,
  fetchSessions,
} from "../../../store/actions/sessionActions";
import { fetchRecipes } from "../../../store/actions/recipeActions";
import { fetchChefs } from "../../../store/actions/chefActions";
import { fetchCuisines } from "../../../store/actions/cuisineActions";

import {
  DeleteForeverOutlined,
  Edit,
  MoreVert,
  ExpandMore,
  PostAdd,
} from "@material-ui/icons";
import { booking } from "../../../store/actions/bookingActions";

export default function SessionDetail() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { sessionId } = useParams();
  const user = useSelector((state) => state.authReducer.user);
  const allSessions = useSelector((state) => state.sessionReducer.session);
  const allRecipes = useSelector((state) => state.recipeReducer.recipe);
  const allChefs = useSelector((state) => state.chefReducer.chef);
  const allCuisines = useSelector((state) => state.cuisineReducer.cuisine);

  const sessionLoading = useSelector((state) => state.sessionReducer.loading);
  const recipeLoading = useSelector((state) => state.recipeReducer.loading);
  const chefLoading = useSelector((state) => state.chefReducer.loading);
  const cuisineLoading = useSelector((state) => state.cuisineReducer.cuisine);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    if (sessionLoading || recipeLoading || chefLoading || cuisineLoading) {
      return (
        dispatch(fetchSessions()),
        dispatch(fetchRecipes()),
        dispatch(fetchChefs()),
        dispatch(fetchCuisines())
      );
    }
  }, {});
  if (sessionLoading || recipeLoading || chefLoading)
    return <CircularProgress />;
  const foundSession = allSessions.find((session) => session.id === +sessionId);
  console.log(foundSession);
  const foundRecipe = allRecipes.find(
    (recipe) => recipe.id === foundSession.recipeId
  );
  const foundCuisine = allCuisines.find(
    (cuisine) => foundRecipe.cuisineId === cuisine.id
  );

  const foundChef = allChefs.find((chef) => chef.id === foundRecipe.chefId);
  if (!foundSession) return <Redirect to="/sessions" />;
  return (
    <Grid
      container
      // direction="column"
      justify="center"
      alignItems="flex-start"
      xs={12}
      className={classes.root}
    >
      <Card justify="center" />
      <Grid xs={12}>
        <CardHeader
          title={`Chef ${foundChef.name}'s ${foundRecipe.name}`}
          subheader="Session Details"
          action={
            <div>
              {user && foundChef.userId === user.id ? (
                <>
                  <IconButton
                    aria-controls="chef-controls"
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    <MoreVert />
                  </IconButton>
                  <Menu
                    id="chef-controls"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <Tooltip title="Edit Session Details">
                      <MenuItem
                        component={Link}
                        to={`/sessions/${sessionId}/edit`}
                      >
                        <Edit />
                      </MenuItem>
                    </Tooltip>
                    <Tooltip title="Delete Session">
                      <MenuItem
                        onClick={() =>
                          dispatch(
                            deleteSession(
                              sessionId,
                              foundRecipe.id,
                              foundChef,
                              history
                            )
                          )
                        }
                      >
                        <DeleteForeverOutlined />
                      </MenuItem>
                    </Tooltip>
                  </Menu>{" "}
                </>
              ) : (
                ""
              )}
            </div>
          }
        />
      </Grid>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        xs={12}
      >
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
          xs={6}
        >
          <CardMedia
            className={classes.media}
            image={foundRecipe.image}
            title={foundRecipe.name}
          />
        </Grid>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
          xs={6}
        >
          <Grid
            item
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            xs={12}
          >
            <Typography
              className={classes.info}
              color="textSecondary"
              variant="subtitle2"
            >
              Date: {foundSession.date}
              <br />
              Time: {foundSession.time}
            </Typography>
            <Accordion className={classes.accordion}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Recipe Description</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography color={"secondary"}>
                  {foundRecipe.description}
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion className={classes.accordion}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Ingredients</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography color={"secondary"}>
                  {foundRecipe.ingredientDescription}
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion className={classes.accordion}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel3a-content"
                id="panel3a-header"
              >
                <Typography>Cuisine</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography color={"secondary"}>{foundCuisine.name}</Typography>
              </AccordionDetails>
            </Accordion>
            {/* {user && user.isChef && foundChef.userId === user.id ? (
              <div>
                <Accordion className={classes.accordion}>
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel4a-content"
                    id="panel4a-header"
                  >
                    <Typography>Bookings</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <BookingList sessionId={sessionId} />
                  </AccordionDetails>
                </Accordion>
              </div>
            ) : (
              ""
            )} */}
          </Grid>
          {user && user.id !== foundChef.userId ? (
            // <Link to={`/sessions/${sessionId}/booking`}>
            <IconButton component={Link} to={`sessions/${sessionId}/booking`}>
              <PostAdd />
            </IconButton>
          ) : (
            // </Link>
            ""
          )}
        </Grid>
      </Grid>
      <Card />
    </Grid>
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
