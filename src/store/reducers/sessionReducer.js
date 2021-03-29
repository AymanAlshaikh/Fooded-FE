import * as types from "../actions/types";

const initialState = {
  session: [], // session Data,
  loading: true,
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_SESSION:
      return { ...state, session: action.payload, loading: false };

    case types.SEARCH_SESSION:
      return { ...state, session: action.payload, loading: false };

    default:
      return state;
  }
};

export default sessionReducer;
