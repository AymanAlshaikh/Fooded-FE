import * as types from "../actions/types";

const initialState = {
  recipe: [],
  loading: true,
};

const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_RECIPE:
      return { ...state, recipe: action.payload, loading: false };

    case types.ADD_RECIPE:
      return {
        ...state,
        recipe: [...state.recipe, action.payload.newRecipe],
      };

    case types.REMOVE_RECIPE:
      return {
        ...state,
        recipe: state.recipe.filter(
          (recipe) => recipe.id !== action.payload.recipeId
        ),
      };

    case types.UPDATE_RECIPE:
      const { updatedRecipe } = action.payload;
      return {
        ...state,
        recipe: state.recipe.map((recipe) =>
          recipe.id === updatedRecipe.id ? updatedRecipe : recipe
        ),
      };

    default:
      return state;
  }
};

export default recipeReducer;
