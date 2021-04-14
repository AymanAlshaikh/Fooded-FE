import * as types from "../actions/types";

const initialState = {
  ingredientRecipe: [],
  loading: true,
};

const ingredientRecipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_INGREDIENTRECIPE:
      return { ...state, ingredientRecipe: action.payload, loading: false };
    default:
      return state;
  }
};

export default ingredientRecipeReducer;
