import instance from "./instance";
import * as types from "./types";

export const fetchBookings = () => {
  return async (dispatch) => {
    try {
      const res = await instance.get("/booking");
      dispatch({ type: types.FETCH_SESSION, payload: res.data });
    } catch (error) {
      console.log("fetchBookings bookingActions Error:", error);
    }
  };
};

export const searchBooking = (searchedBooking) => {
  return async (dispatch) => {
    try {
      console.log("booking search coming from actions: ", searchedBooking);
      const res = await instance.post("/booking/search", searchedBooking);
      console.log("booking actions res: ", res.data);
      dispatch({ type: types.SEARCH_SESSION, payload: res.data });
    } catch (error) {
      console.log("searchBooking bookingActions Error:", error);
    }
  };
};

export const addBooking = (newBooking, currentChef) => async (dispatch) => {
  try {
    const res = await instance.post(
      `/sessions/${currentChef.id}/booking`,
      newBooking
    );

    dispatch({
      type: types.ADD_SESSION,
      payload: { newBooking: res.data },
    });
  } catch (error) {
    console.log("addBooking bookingActions Error:", error);
  }
};

export const updateBooking = (
  updatedBooking,

  recipeId,
  booking
) => async (dispatch) => {
  try {
    const res = await instance.put(
      `recipes/${recipeId}/booking/${booking.id}`,
      updatedBooking
    );
    dispatch({
      type: types.UPDATE_SESSION,
      payload: { updatedBooking: res.data },
    });
  } catch (error) {
    console.log("updateBooking bookingActions Error:", error);
  }
};

export const deleteBooking = (bookingId, recipe) => async (dispatch) => {
  try {
    await instance.delete(`/recipes/${recipe.id}/booking/${bookingId}`);
    dispatch({ type: types.REMOVE_SESSION, payload: { bookingId: bookingId } });
  } catch (error) {
    console.log("deleteBooking bookingActions Error:", error);
  }
};

export const booking = (bookSession, sessionId) => async (dispatch) => {
  try {
    const res = await instance.post(
      `/sessions/${sessionId}/booking`,
      bookSession
    );
    dispatch({
      type: types.BOOK_SESSION,
      // payload: bookSession,
    });
  } catch (error) {
    console.log(error);
  }
};
