import { useSelector } from "react-redux";
import RecipeItem from "../RecipeItem";

const RecipeList = () => {
  const recipes = useSelector((state) => state.recipeReducer.recipe);
  console.log(recipes);
  const recipeList = recipes.map((recipe) => (
    <RecipeItem key={recipe.id} recipe={recipe} />
  ));
  return recipeList;
};
export default RecipeList;
