import instance from "./instance";
import * as types from "./types";

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const res = await instance.get("/users");

      dispatch({ type: types.FETCH_USERS, payload: res.data });
    } catch (error) {
      console.log("fetchUser userActions Error:", error);
    }
  };
};
