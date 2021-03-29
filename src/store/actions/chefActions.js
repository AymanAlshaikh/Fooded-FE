import instance from "./instance";
import * as types from "./types";

export const fetchChefs = () => {
  return async (dispatch) => {
    try {
      const res = await instance.get("/chefs");
      dispatch({ type: types.FETCH_CHEF, payload: res.data });
    } catch (error) {
      console.log("fetchChef chefActions Error:", error);
    }
  };
};
