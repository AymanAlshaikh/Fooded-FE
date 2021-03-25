import "./App.css";
import SignIn from "./components/Signin";
import { Route, Switch } from "react-router";
import Signup from "./components/Authentication/signup";
import SwipeableTemporaryDrawer from "./components/Drawer";

function App() {
  return (
    <Switch>
      <Route path="/signup">
        <SwipeableTemporaryDrawer />
        <Signup />
      </Route>
      <Route path="/signin">
        <SignIn />
      </Route>
    </Switch>
  );
}

export default App;
