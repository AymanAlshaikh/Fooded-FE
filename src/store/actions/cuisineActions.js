import instance from "./instance";
import * as types from "./types";

export const fetchCuisines = () => {
  return async (dispatch) => {
    try {
      const res = await instance.get("/cuisine");
      dispatch({ type: types.FETCH_CUISINE, payload: res.data });
    } catch (error) {
      console.log("fetchCuisines cuisineActions Error:", error);
    }
  };
};

export const addCuisine = (newCuisine) => async (dispatch) => {
  console.log(newCuisine);
  try {
    const res = await instance.post("/cuisine", newCuisine);
    dispatch({
      type: types.ADD_CUISINE,
      payload: { newCuisine: res.data },
    });
  } catch (error) {
    console.log("addCuisine cuisineActions Error:", error);
  }
};

// DONE
export const updateCuisine = (updatedCuisine, cuisine) => async (dispatch) => {
  try {
    const res = await instance.put(`/cuisine/${cuisine.id}`, updatedCuisine);
    dispatch({
      type: types.UPDATE_CUISINE,
      payload: { updatedCuisine: res.data },
    });
  } catch (error) {
    console.log("updateCuisine cuisineActions Error:", error);
  }
};

// DONE
export const deleteCuisine = (cuisineId) => async (dispatch) => {
  try {
    await instance.delete(`/cuisine/${cuisineId}`);
    dispatch({ type: types.REMOVE_CUISINE, payload: { cuisineId: cuisineId } });
  } catch (error) {
    console.log("deleteCuisine cuisineActions Error:", error);
  }
};
