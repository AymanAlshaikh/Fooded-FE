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
