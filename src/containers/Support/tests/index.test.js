import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { initialState as initialAuthenticatorState } from 'containers/common/Authenticator/reducer';
import { initialState } from '../reducer';

import configureStore from 'utils/common/redux/configure-store';

import SupportIndex from '../index';
import Support from '../Container';

const testLinks = [
  { url: 'URL_1', description: 'description 1', name: 'name 1' },
  { url: 'URL_2', description: 'description 2', name: 'name 2' },
];

describe('<Support />', () => {
  let store;
  const spy = jest.fn();

  beforeAll(() => {
    store = configureStore({});
  });

  it('should render correctly - index', () => {
    const { container } = render(
      <Provider store={store}>
        <SupportIndex />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with initial state', () => {
    const { container } = render(
      <Provider store={store}>
        <Support
          loadLinks={spy}
          createLink={spy}
          deleteLink={spy}
          supportState={{
            ...initialState,
          }}
          authenticatorState={{
            ...initialAuthenticatorState,
          }}
        />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly when loading', () => {
    const { container } = render(
      <Provider store={store}>
        <Support
          loadLinks={spy}
          createLink={spy}
          deleteLink={spy}
          supportState={{
            ...initialState,
            loadingLinks: true,
          }}
          authenticatorState={{
            ...initialAuthenticatorState,
          }}
        />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with links', () => {
    const { container } = render(
      <Provider store={store}>
        <Support
          loadLinks={spy}
          createLink={spy}
          deleteLink={spy}
          supportState={{
            ...initialState,
            links: testLinks,
          }}
          authenticatorState={{
            ...initialAuthenticatorState,
          }}
        />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with loadError', () => {
    const { container } = render(
      <Provider store={store}>
        <Support
          loadLinks={spy}
          createLink={spy}
          deleteLink={spy}
          supportState={{
            ...initialState,
            loadLinksError: { error: 'some_error', errorMessage: 'some error message' },
          }}
          authenticatorState={{
            ...initialAuthenticatorState,
          }}
        />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with admin', () => {
    const { container } = render(
      <Provider store={store}>
        <Support
          loadLinks={spy}
          createLink={spy}
          deleteLink={spy}
          supportState={{
            ...initialState,
          }}
          authenticatorState={{
            ...initialAuthenticatorState,
            user: { admin: true },
          }}
        />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with admin and createLinkError', () => {
    const { container } = render(
      <Provider store={store}>
        <Support
          loadLinks={spy}
          createLink={spy}
          deleteLink={spy}
          supportState={{
            ...initialState,
            createLinkError: { error: 'some_error', errorMessage: 'Error creating link' },
          }}
          authenticatorState={{
            ...initialAuthenticatorState,
            user: { admin: true },
          }}
        />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with admin and deleteLinkError', () => {
    const { container } = render(
      <Provider store={store}>
        <Support
          loadLinks={spy}
          createLink={spy}
          deleteLink={spy}
          supportState={{
            ...initialState,
            deleteLinkError: { error: 'some_error', errorMessage: 'Error deleting link' },
          }}
          authenticatorState={{
            ...initialAuthenticatorState,
            user: { admin: true },
          }}
        />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});
