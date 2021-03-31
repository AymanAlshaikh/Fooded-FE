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
      const res = await instance.post(`/recipes/search`, searchRecipe);
      dispatch({ type: types.SEARCH_RECIPE, payload: res.data });
    } catch (error) {
      console.log("searchRecipe recipeActions Error:", error);
    }
  };
};

export const addRecipe = (newRecipe, history, image, chef) => async (
  dispatch
) => {
  try {
    const formData = new FormData();
    for (const key in newRecipe) formData.append(key, newRecipe[key]);
    formData.append("image", image);
    const res = await instance.post(`/chefs/${chef.id}/recipes`, formData);
    dispatch({
      type: types.ADD_RECIPE,
      payload: { newRecipe: res.data },
    });
    history.replace("/recipes");
  } catch (error) {
    console.log("addRecipe recipeActions Error:", error);
  }
};

export const updateRecipe = (updatedRecipe) => async (dispatch) => {
  try {
    const res = await instance.put(
      `/recipes/${updatedRecipe.recipeId}`,
      updatedRecipe
    );
    dispatch({
      type: types.UPDATE_RECIPE,
      payload: { updatedRecipe: res.data },
    });
  } catch (error) {
    console.log("updateRecipe recipeActions Error:", error);
  }
};

export const deleteRecipe = (recipeId) => async (dispatch) => {
  try {
    await instance.delete(`/recipes/${recipeId}`);
    dispatch({ type: types.REMOVE_RECIPE, payload: { recipeId: recipeId } });
  } catch (error) {
    console.log("deleteRecipe recipeActions Error:", error);
  }
};
