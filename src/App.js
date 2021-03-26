import SwipeableTemporaryDrawer from "./components/Drawer";
import Routes from "./components/Routes";
import RecipeList from "./components/Recipe/RecipeList";

function App() {
  return (
    <div>
      <RecipeList />
      <SwipeableTemporaryDrawer />
      <Routes />
    </div>
  );
}

export default App;
