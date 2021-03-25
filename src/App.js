import logo from "./logo.svg";
import "./App.css";

import SignIn from "./components/Signin";
import { Route, Switch } from "react-router";
import Signup from "./components/Authentication/signup";

function App() {
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
}

export default App;
