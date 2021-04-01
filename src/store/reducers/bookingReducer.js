import * as types from "../actions/types";

const initialState = {
  bookings: [],
};

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.BOOK_SESSION:
      return {
        ...state,
        bookings: [...state.bookings, action.payload],
      };

    default:
      return state;
  }
};

export default bookingReducer;
