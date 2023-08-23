// actions.ts

export const FETCH_MOVIES_REQUEST = 'FETCH_MOVIES_REQUEST';
export const FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS';
export const FETCH_MOVIES_FAILURE = 'FETCH_MOVIES_FAILURE';

interface FetchMoviesRequestAction {
  type: typeof FETCH_MOVIES_REQUEST;
}

interface FetchMoviesSuccessAction {
  type: typeof FETCH_MOVIES_SUCCESS;
  //@ts-ignore
  payload: Movie[];
}

interface FetchMoviesFailureAction {
  type: typeof FETCH_MOVIES_FAILURE;
  payload: string;
}

export type MovieActionTypes =
  | FetchMoviesRequestAction
  | FetchMoviesSuccessAction
  | FetchMoviesFailureAction;

export const fetchMoviesRequest = (): MovieActionTypes => ({
  type: FETCH_MOVIES_REQUEST,
});
//@ts-ignore.
export const fetchMoviesSuccess = (movies: Movie[]): MovieActionTypes => ({
  type: FETCH_MOVIES_SUCCESS,
  payload: movies,
});

export const fetchMoviesFailure = (error: string): MovieActionTypes => ({
  type: FETCH_MOVIES_FAILURE,
  payload: error,
});
