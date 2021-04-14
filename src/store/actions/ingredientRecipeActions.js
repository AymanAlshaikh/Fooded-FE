import instance from "./instance";
import * as types from "./types";

export const fetchIngredientRecipes = () => {
  return async (dispatch) => {
    try {
      const res = await instance.get("/relation");
      dispatch({ type: types.FETCH_INGREDIENTRECIPE, payload: res.data });
    } catch (error) {
      console.log(
        "fetchIngredientRecipes ingredientRecipeActions Error:",
        error
      );
    }
  };
};
