import instance from "./instance";
import * as types from "./types";

export const fetchRecipes = () => {
  return async (dispatch) => {
    try {
      const res = await instance.get("/recipes");
      dispatch({ type: types.FETCH_RECIPE, payload: res.data });
    } catch (error) {
      console.log("fetchRecipes recipeActions Error:", error);
    }
  };
};

export const searchRecipe = (searchRecipe) => {
  return async (dispatch) => {
    try {
      console.log("coming from the actions: ", searchRecipe);
      console.log("actions type of Recipe", typeof searchRecipe);
      const res = await instance.post(`/recipes/search`, searchRecipe);
      console.log("search Action response: ", res.data);
      dispatch({ type: types.SEARCH_RECIPE, payload: res.data });
    } catch (error) {
      console.log("searchRecipe flightActions Error:", error);
    }
  };
};
