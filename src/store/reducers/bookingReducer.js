import * as types from "../actions/types";

const initialState = {
  bookings: [],
  loading: true,
};

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_BOOKINGS:
      return { ...state, bookings: action.payload, loading: false };

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
