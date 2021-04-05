import * as types from "../actions/types";

const initialState = {
  session: [],
  loading: true,
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_SESSION:
      return { ...state, session: action.payload, loading: false };

    case types.SEARCH_SESSION:
      return { ...state, session: action.payload, loading: false };

    case types.ADD_SESSION:
      return {
        ...state,
        session: [...state.session, action.payload.newSession],
      };

    case types.REMOVE_SESSION: //ICEd
      return {
        ...state,
        session: state.session.filter(
          (session) => session.id !== action.payload.sessionId
        ),
      };

    case types.UPDATE_SESSION: //ICEd
      const { updatedSession } = action.payload;
      return {
        ...state,
        session: state.session.map((session) =>
          session.id === updatedSession.id ? updatedSession : session
        ),
      };

    default:
      return state;
  }
};

export default sessionReducer;
