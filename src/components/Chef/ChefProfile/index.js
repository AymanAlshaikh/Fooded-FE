import React, { useState } from "react";
import { useSelector } from "react-redux";

//Dev express imports
import moment from "moment";
import Paper from "@material-ui/core/Paper";
import {
  Scheduler,
  WeekView,
  MonthView,
  Appointments,
} from "@devexpress/dx-react-scheduler-material-ui";

const ChefProfile = () => {
  const user = useSelector((state) => state.authReducer.user);

  const chefs = useSelector((state) => state.chefReducer.chef);
  const thisChef = chefs.find((chef) => chef.userId === user.id);
  const ChefID = thisChef.id;

  const recipes = useSelector((state) => state.recipeReducer.recipe);
  const chefRecipe = recipes.filter((recipe) => recipe.chefId === ChefID);

  const sessions = useSelector((state) => state.sessionReducer.session);

  const sessionList = chefRecipe.map((recipe) =>
    sessions.find((session) => session.recipeId === recipe.id)
  );

  const [view, setView] = useState("month");

  const handleView = () => {
    if (view === "month") {
      setView("week");
    } else {
      setView("month");
    }
  };

  let appointments = [];

  sessionList.forEach(
    (session) =>
      session !== undefined &&
      appointments.push({
        title: `session ${session.id}`,
        startDate: new Date(moment(session.date)),
        endDate: new Date(moment(session.date).add(1, "hour")),
      })
  );

  return (
    <div>
      <Paper>
        <Scheduler data={appointments}>
          <button onClick={handleView}>Change View</button>
          {view === "month" ? <MonthView /> : <WeekView />}
          <Appointments />
        </Scheduler>
      </Paper>
    </div>
  );
};
export default ChefProfile;
