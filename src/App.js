import SwipeableTemporaryDrawer from "./components/Drawer";
import AddRecipe from "./components/Recipe/AddRecipe";
import Routes from "./components/Routes";
import Copyright from "./components/Authentication/Copyright";

function App() {
  return (
    <div>
      <SwipeableTemporaryDrawer />
      <Routes />
      <Copyright />;
    </div>
  );
}

export default App;
