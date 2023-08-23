// reducers.ts
import {
    FETCH_MOVIES_REQUEST,
    FETCH_MOVIES_SUCCESS,
    FETCH_MOVIES_FAILURE,
    MovieActionTypes,
  } from './actions';
  
  interface Movie {
    id: number;
  }
  
  interface MovieState {
    movies: Movie[];
    loading: boolean;
    error: string | null;
  }
  
  const initialState: MovieState = {
    movies: [],
    loading: false,
    error: null,
  };
  
  const movieReducer = (state = initialState, action: MovieActionTypes): MovieState => {
    switch (action.type) {
      case FETCH_MOVIES_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_MOVIES_SUCCESS:
        return {
          ...state,
          loading: false,
          movies: action.payload,
        };
      case FETCH_MOVIES_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default movieReducer;
  