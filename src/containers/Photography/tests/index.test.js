import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { initialState } from '../reducer';

import configureStore from 'client-utils/common/redux/configure-store';

import PhotographyIndex from '../index';
import Photography from '../Container';

const testPhotos = [];

describe('<Photography />', () => {
  let store;
  const spy = jest.fn();

  beforeAll(() => {
    store = configureStore({});
  });

  it('should render correctly - index', () => {
    const { container } = render(
      <Provider store={store}>
        <PhotographyIndex />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with initial state', () => {
    const { container } = render(
      <Provider store={store}>
        <Photography loadPhotos={spy} photographyState={{ ...initialState }} />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly when loading', () => {
    const { container } = render(
      <Provider store={store}>
        <Photography
          loadPhotos={spy}
          photographyState={{
            ...initialState,
            loadingPhotos: true,
          }}
        />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with photos', () => {
    const { container } = render(
      <Provider store={store}>
        <Photography
          loadPhotos={spy}
          photographyState={{
            ...initialState,
            photos: testPhotos,
          }}
        />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with loadError', () => {
    const { container } = render(
      <Provider store={store}>
        <Photography
          loadPhotos={spy}
          photographyState={{
            ...initialState,
            loadPhotosError: { error: 'some_error', errorMessage: 'some error message' },
          }}
        />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});
