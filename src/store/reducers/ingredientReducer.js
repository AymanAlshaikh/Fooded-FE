import * as types from "../actions/types";

const initialState = {
  ingredients: [],
  loading: true,
};

const ingredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_INGREDIENT:
      return { ...state, ingredients: action.payload, loading: false };
    default:
      return state;
  }
};

export default ingredientReducer;
