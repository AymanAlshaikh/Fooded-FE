import logo from "./logo.svg";
import "./App.css";
import SignIn from "./components/Signin";
import { Route, Switch } from "react-router";

function App() {
  return (
    <Switch>
      <Route path="/signup">
        <h1>Ayman</h1>
      </Route>
      <Route path="/signin">
        <SignIn />
      </Route>
    </Switch>
  );
}

export default App;
