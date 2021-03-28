import * as types from "../actions/types";

const initialState = {
  recipe: [], // recipe Data,
  loading: true,
};

const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_RECIPE:
      return { ...state, recipe: action.payload, loading: false };

    case types.SEARCH_RECIPE:
      return {
        ...state,
        recipe: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default recipeReducer;
