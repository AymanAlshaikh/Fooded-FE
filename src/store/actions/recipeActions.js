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
      console.log("searchRecipe recipeActions Error:", error);
    }
  };
};

export const addRecipe = (newRecipe, history) => async (dispatch) => {
  console.log("action", newRecipe);
  try {
    const formData = new FormData();
    for (const key in newRecipe) formData.append(key, newRecipe[key]);
    const res = await instance.post("/recipes", formData);
    dispatch({
      type: types.ADD_RECIPE,
      payload: { newRecipe: res.data },
    });
    history.replace("/recipes");
  } catch (error) {
    console.log("addRecipe recipeActions Error:", error);
  }
};

// export const addCar = (newCar) => async (dispatch) => {
//   try {
//     const formData = new FormData();
//     for (const key in newCar) formData.append(key, newCar[key]);
//     const res = await instance.post(
//       /manufacturers/${newCar.manufacturerId}/cars,
//       formData
//     );
//     dispatch({
//       type: types.ADD_CAR,
//       payload: { newCar: res.data },
//     });
//   } catch (err) {}
// };

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
