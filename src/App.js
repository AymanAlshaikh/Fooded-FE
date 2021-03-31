import SwipeableTemporaryDrawer from "./components/Drawer";
import Routes from "./components/Routes";
import Copyright from "./components/Authentication/Copyright";
import AddSession from "./components/Session/AddSession";

function App() {
  return (
    <div>
      <SwipeableTemporaryDrawer />
      <Routes />
      <Copyright />
    </div>
  );
}

export default App;
