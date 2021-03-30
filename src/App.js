import SwipeableTemporaryDrawer from "./components/Drawer";
import AddRecipe from "./components/Recipe/AddRecipe";
import Routes from "./components/Routes";

function App() {
  return (
    <div>
      <SwipeableTemporaryDrawer />
      <AddRecipe />
      <Routes />
    </div>
  );
}

export default App;
