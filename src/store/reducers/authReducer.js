import * as types from "../actions/types";

const initialState = {
  user: null, // user Data,
  loading: true,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default userReducer;
