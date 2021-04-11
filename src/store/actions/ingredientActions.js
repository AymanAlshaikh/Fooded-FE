import instance from "./instance";
import * as types from "./types";

export const fetchIngredients = () => {
  return async (dispatch) => {
    try {
      const res = await instance.get("/ingredients");
      dispatch({ type: types.FETCH_INGREDIENT, payload: res.data });
    } catch (error) {
      console.log("fetchIngredients ingredeitnsActions Error:", error);
    }
  };
};
