import * as types from "../actions/types";

const initialState = {
  users: [], // users Data,
  loading: true,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_USERS:
      return { ...state, users: action.payload, loading: false };

    default:
      return state;
  }
};

export default userReducer;
