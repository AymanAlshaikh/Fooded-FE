import React from "react";
import { useSelector } from "react-redux";

//Dev express imports
import moment from "moment";
import Paper from "@material-ui/core/Paper";
import {
  Scheduler,
  // WeekView, (Currently unimplemented)
  MonthView,
  Appointments,
} from "@devexpress/dx-react-scheduler-material-ui";

const ChefProfile = () => {
  const user = useSelector((state) => state.authReducer.user);
  const loading = useSelector((state) => state.authReducer.loading);

  const chefs = useSelector((state) => state.chefReducer.chef);
  const thisChef = chefs.find((chef) => chef.userId === user.id);
  const ChefID = thisChef.id;

  const recipes = useSelector((state) => state.recipeReducer.recipe);
  const chefRecipe = recipes.filter((recipe) => recipe.chefId === ChefID);

  const sessions = useSelector((state) => state.sessionReducer.session);

  const sessionList = chefRecipe.map((recipe) =>
    sessions.find((session) => session.recipeId === recipe.id)
  );

  // let appointments = [];

  // sessionList.map((session) =>
  //   appointments.push({
  //     title: `session ${session.id}`,
  //     startDate: new Date(moment(session.date)),
  //     endDate: new Date(moment(session.date).add(1, "hour")),
  //   })
  // );

  if (!loading) {
    // console.log("appointments: ", appointments);
    console.log("session list: ", sessionList);
    console.log("sessions: ", sessions);
    console.log(chefRecipe);
    console.log(ChefID);
    console.log(thisChef);
  }
  return (
    <div>
      {/* <Paper>
        <Scheduler data={appointments}>
          <MonthView />
          <Appointments />
        </Scheduler>
      </Paper> */}
      <h1>AY SHAY</h1>
    </div>
  );
};
export default ChefProfile;
