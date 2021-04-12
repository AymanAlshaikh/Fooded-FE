import instance from "./instance";
import * as types from "./types";

export const fetchBookings = () => {
  return async (dispatch) => {
    try {
      const res = await instance.get("/booking");
      dispatch({ type: types.FETCH_BOOKINGS, payload: res.data });
    } catch (error) {
      console.log("fetchBookings bookingActions Error:", error);
    }
  };
};

// ICEd
export const updateBooking = (updatedBooking, recipeId, booking) => async (
  dispatch
) => {
  try {
    const res = await instance.put(
      `recipes/${recipeId}/booking/${booking.id}`,
      updatedBooking
    );
    dispatch({
      type: types.UPDATE_BOOKINGS,
      payload: { updatedBooking: res.data },
    });
  } catch (error) {
    console.log("updateBooking bookingActions Error:", error);
  }
};
// ICEd
export const deleteBooking = (bookingId, recipe) => async (dispatch) => {
  try {
    await instance.delete(`/recipes/${recipe.id}/booking/${bookingId}`);
    dispatch({
      type: types.REMOVE_BOOKINGS,
      payload: { bookingId: bookingId },
    });
  } catch (error) {
    console.log("deleteBooking bookingActions Error:", error);
  }
};

export const booking = (bookSession, sessionId) => async (dispatch) => {
  try {
    await instance.post(`/sessions/${sessionId}/booking`, bookSession);
    dispatch({
      type: types.BOOK_SESSION,
    });
  } catch (error) {
    console.log(error);
  }
};
