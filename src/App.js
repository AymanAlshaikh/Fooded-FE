import SwipeableTemporaryDrawer from "./components/Drawer";
import RecipeDetail from "./components/Recipe/RecipeDetail";
import Routes from "./components/Routes";

function App() {
  return (
    <div>
      <SwipeableTemporaryDrawer />

      <Routes />
    </div>
  );
}

export default App;
