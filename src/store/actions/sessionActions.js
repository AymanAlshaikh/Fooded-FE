import instance from "./instance";
import * as types from "./types";

export const fetchSessions = () => {
  return async (dispatch) => {
    try {
      const res = await instance.get("/sessions");
      dispatch({ type: types.FETCH_SESSION, payload: res.data });
    } catch (error) {
      console.log("fetchSessions sessionActions Error:", error);
    }
  };
};
