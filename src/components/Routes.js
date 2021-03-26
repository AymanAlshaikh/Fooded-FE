import { Route, Switch } from "react-router";
import Signup from "./Authentication/Signup";
import SignIn from "./Authentication/Signin";

const Routes = () => {
  return (
    <Switch>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/signin">
        <SignIn />
      </Route>
    </Switch>
  );
};
export default Routes;
