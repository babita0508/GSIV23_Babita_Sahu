import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ListPage from '../ListPage';
import { Movie } from '../types';

const mockStore = configureStore([]);

describe('ListPage Component', () => {
  it('matches snapshot', () => {
    const store = mockStore({
      movies: [] as Movie[], // Initialize as an empty array of Movie type
      loading: false,
      error: null,
    });

    const { asFragment } = render(
      <Provider store={store}>
        <ListPage />
      </Provider>
    );

    // Compare the rendered component with the saved snapshot
    expect(asFragment()).toMatchSnapshot();
  });
});
