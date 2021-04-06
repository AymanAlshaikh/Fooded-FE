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

export const addRecipe = (newRecipe, image, chefId) => async (dispatch) => {
  try {
    const formData = new FormData();
    for (const key in newRecipe) formData.append(key, newRecipe[key]);
    formData.append("image", image);
    const res = await instance.post(`/chefs/${chefId}/recipes`, formData);

    dispatch({
      type: types.ADD_RECIPE,
      payload: { newRecipe: res.data },
    });
  } catch (error) {
    console.log("addRecipe recipeActions Error:", error);
  }
};

export const updateRecipe = (updatedRecipe, image, chefId, recipe) => async (
  dispatch
) => {
  try {
    const formData = new FormData();
    for (const key in updatedRecipe) formData.append(key, updatedRecipe[key]);
    formData.append("image", image);
    const res = await instance.put(
      `chefs/${chefId}/recipes/${recipe.id}`,
      formData
    );
    dispatch({
      type: types.UPDATE_RECIPE,
      payload: { updatedRecipe: res.data },
    });
  } catch (error) {
    console.log("updateRecipe recipeActions Error:", error);
  }
};

export const deleteRecipe = (recipeId, chef) => async (dispatch) => {
  try {
    await instance.delete(`/chefs/${chef.id}/recipes/${recipeId}`);
    dispatch({ type: types.REMOVE_RECIPE, payload: { recipeId: recipeId } });
  } catch (error) {
    console.log("deleteRecipe recipeActions Error:", error);
  }
};
