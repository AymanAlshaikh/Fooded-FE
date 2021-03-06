import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
//Dev express imports
import moment from "moment";
import { Button, CircularProgress, Grid, Paper } from "@material-ui/core/";
import {
  Scheduler,
  WeekView,
  MonthView,
  Appointments,
} from "@devexpress/dx-react-scheduler-material-ui";

const ChefProfile = () => {
  const [view, setView] = useState("month");
  const user = useSelector((state) => state.authReducer.user);
  const userLoading = useSelector((state) => state.authReducer.loading);
  const recipes = useSelector((state) => state.recipeReducer.recipe);
  const recipeLoading = useSelector((state) => state.recipeReducer.loading);
  const sessions = useSelector((state) => state.sessionReducer.session);
  const sessionLoading = useSelector((state) => state.sessionReducer.loading);

  const chefs = useSelector((state) => state.chefReducer.chef);
  const chefLoading = useSelector((state) => state.chefReducer.loading);
  if (chefLoading || userLoading || sessionLoading || recipeLoading)
    return <CircularProgress />;
  const thisChef = chefs.find((chef) => chef.userId === user.id);
  const ChefID = thisChef.id;

  const chefRecipe = recipes.filter((recipe) => recipe.chefId === ChefID);

  const sessionList = chefRecipe.map((recipe) =>
    sessions.find((session) => session.recipeId === recipe.id)
  );

  const handleView = () => {
    if (view === "month") {
      setView("week");
    } else {
      setView("month");
    }
  };

  let appointments = [];
  let sessionId = null;

  sessionList.forEach(
    (session) =>
      session !== undefined &&
      appointments.push({
        title: (
          <Button component={Link} to={`/sessions/${session.id}`}>
            {`${session.time} `}
            <br />
            {`Session Recipe: ${session.recipeName}`}
          </Button>
        ),
        startDate: new Date(moment(session.date)),
        endDate: new Date(moment(session.date).add(1, "hour")),
      })
  );
  return (
    <div>
      <Paper>
        <Scheduler data={appointments}>
          <Button onClick={handleView}>
            {view === "month" ? "Switch to Week View" : "Switch to Month View"}
          </Button>
          {view === "month" ? <MonthView /> : <WeekView />}

          <Appointments />
        </Scheduler>
      </Paper>
    </div>
  );
};
export default ChefProfile;
