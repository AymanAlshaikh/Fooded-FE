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

export const addSession = (newSession, currentChef) => async (dispatch) => {
  try {
    const res = await instance.post(
      `/chefs/${currentChef.id}/sessions`,
      newSession
    );

    dispatch({
      type: types.ADD_SESSION,
      payload: { newSession: res.data },
    });
  } catch (error) {
    console.log("addSession sessionActions Error:", error);
  }
};
// ICEd
export const updateSession = (
  updatedSession,
  currentChef,
  recipeId,
  session
) => async (dispatch) => {
  try {
    const res = await instance.put(
      `chefs/${currentChef.id}/recipes/${recipeId}/sessions/${session.id}`,
      updatedSession
    );
    dispatch({
      type: types.UPDATE_SESSION,
      payload: { updatedSession: res.data },
    });
  } catch (error) {
    console.log("updateSession sessionActions Error:", error);
  }
};
// ICEd
export const deleteSession = (sessionId, recipe) => async (dispatch) => {
  try {
    await instance.delete(`/recipes/${recipe.id}/sessions/${sessionId}`);
    dispatch({ type: types.REMOVE_SESSION, payload: { sessionId: sessionId } });
  } catch (error) {
    console.log("deleteSession sessionActions Error:", error);
  }
};
