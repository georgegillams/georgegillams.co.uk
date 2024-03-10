import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { initialState as initialAuthenticatorState } from 'containers/common/Authenticator/reducer';
import { initialState } from '../reducer';

import configureStore from 'client-utils/common/redux/configure-store';

import BookListIndex from '../index';
import ReadingList from '../Container';

const testBooks = [
  {
    title: 'Book 1 🎉',
    author: 'Author 1',
    id: 'asdfg',
    status: 'toRead',
  },
  {
    title: 'Book 2',
    author: 'Author 2',
    id: 'asdfh',
    status: 'currentlyReading',
  },
  {
    title: 'Book 3',
    author: 'Author 3',
    id: 'asdfi',
    status: 'currentlyReading',
    deleted: true,
  },
];

describe('<BookList />', () => {
  let store;
  const spy = jest.fn();

  beforeAll(() => {
    store = configureStore({});
  });

  it('should render correctly - index', () => {
    const { container } = render(
      <Provider store={store}>
        <BookListIndex />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with initial state', () => {
    const { container } = render(
      <Provider store={store}>
        <ReadingList
          logout={spy}
          loadBooks={spy}
          createBook={spy}
          updateBook={spy}
          deleteBook={spy}
          linkPrefix="/book"
          readingListState={{
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

  it('should render correctly with book load error', () => {
    const { container } = render(
      <Provider store={store}>
        <ReadingList
          logout={spy}
          loadBooks={spy}
          createBook={spy}
          updateBook={spy}
          deleteBook={spy}
          linkPrefix="/book"
          readingListState={{
            ...initialState,
            booksLoadError: { error: 'not_found', errorMessage: 'Some error' },
          }}
          authenticatorState={{
            ...initialAuthenticatorState,
          }}
        />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with ssrBooks', () => {
    const { container } = render(
      <Provider store={store}>
        <ReadingList
          logout={spy}
          loadBooks={spy}
          createBook={spy}
          updateBook={spy}
          deleteBook={spy}
          linkPrefix="/book"
          ssrBooks={testBooks}
          readingListState={{
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
  it('should render correctly with books', () => {
    const { container } = render(
      <Provider store={store}>
        <ReadingList
          logout={spy}
          loadBooks={spy}
          createBook={spy}
          updateBook={spy}
          deleteBook={spy}
          linkPrefix="/book"
          readingListState={{
            ...initialState,
            books: testBooks,
          }}
          authenticatorState={{
            ...initialAuthenticatorState,
          }}
        />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly authenticated with books', () => {
    const { container } = render(
      <Provider store={store}>
        <ReadingList
          logout={spy}
          loadBooks={spy}
          createBook={spy}
          updateBook={spy}
          deleteBook={spy}
          linkPrefix="/book"
          readingListState={{
            ...initialState,
            books: testBooks,
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
