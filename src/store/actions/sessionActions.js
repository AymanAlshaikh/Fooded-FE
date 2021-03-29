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

export const searchSession = (searchedSession) => {
  return async (dispatch) => {
    try {
      console.log("session search coming from actions: ", searchedSession);
      const res = await instance.post("/sessions/search", searchedSession);
      console.log("session actions res: ", res.data);
      dispatch({ type: types.SEARCH_SESSION, payload: res.data });
    } catch (error) {
      console.log("searchSession sessionActions Error:", error);
    }
  };
};
