import * as types from "../actions/types";

const initialState = {
  chef: [], // chef Data,
  loading: true,
};

const chefReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_CHEF:
      return { ...state, chef: action.payload, loading: false };
    default:
      return state;
  }
};

export default chefReducer;
