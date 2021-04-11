import * as types from "../actions/types";

const initialState = {
  cuisine: [],
  loading: true,
};

const cuisineReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_CUISINE:
      return { ...state, cuisine: action.payload, loading: false };

    case types.ADD_CUISINE:
      return {
        ...state,
        cuisine: [...state.cuisine, action.payload.newCuisine],
      };

    case types.REMOVE_CUISINE:
      return {
        ...state,
        cuisine: state.cuisine.filter(
          (cuisine) => cuisine.id !== action.payload.cuisineId
        ),
      };

    case types.UPDATE_CUISINE:
      const { updatedCuisine } = action.payload;
      return {
        ...state,
        cuisine: state.cuisine.map((cuisine) =>
          cuisine.id === updatedCuisine.id ? updatedCuisine : cuisine
        ),
      };

    default:
      return state;
  }
};

export default cuisineReducer;
