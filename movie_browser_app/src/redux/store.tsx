// store.ts
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension'; // Optional
import movieReducer from './reducers';

const store = createStore(
  movieReducer,
  applyMiddleware(thunkMiddleware)
);

export default store;
