import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { initialState as initialAuthenticatorState } from 'containers/common/Authenticator/reducer';
import { initialState } from '../reducer';

import configureStore from 'client-utils/common/redux/configure-store';

import BlogListIndex from '../index';
import BlogList from '../Container';

const testBlogs = [
  {
    title: 'Blog 1 🎉',
    id: 'asdfg',
    published: true,
    showInBlogsList: true,
  },
  {
    tags: ['travel'],
    requestedId: 'st-ives-2019',
    title: 'St. Ives ⛵ 2018',
    id: 'zxywvuts',
    timestamp: 1595000996720,
    authorId: 'direct_API_invocator',
    blogImage: 'https://i.imgur.com/ppPEuDs.jpg',
    blogCardDate: '23-30',
    published: true,
    showInBlogsList: true,
    blogBannerColor: '#01579b',
    publishedTimestamp: '1577422800',
    lastUpdatedTimestamp: 1595000996720,
  },
  {
    tags: ['travel'],
    requestedId: 'st-ives-2019',
    deleted: true,
    id: 'mndyd8',
    timestamp: 1595000996720,
    authorId: 'direct_API_invocator',
    blogImage: 'https://i.imgur.com/ppPEuDs.jpg',
    blogCardDate: '23-30',
    published: true,
    showInBlogsList: true,
    blogBannerColor: '#01579b',
    publishedTimestamp: '1577422800',
    lastUpdatedTimestamp: 1595000996720,
  },
];

describe('<BlogList />', () => {
  let store;
  const spy = jest.fn();

  beforeAll(() => {
    store = configureStore({});
  });

  it('should render correctly - index', () => {
    const { container } = render(
      <Provider store={store}>
        <BlogListIndex />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with initial state', () => {
    const { container } = render(
      <Provider store={store}>
        <BlogList
          logout={spy}
          loadBlogs={spy}
          deleteBlog={spy}
          linkPrefix="/blog"
          blogListState={{
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

  it('should render correctly with blog load error', () => {
    const { container } = render(
      <Provider store={store}>
        <BlogList
          logout={spy}
          loadBlogs={spy}
          deleteBlog={spy}
          linkPrefix="/blog"
          blogListState={{
            ...initialState,
            blogsLoadError: { error: 'not_found', errorMessage: 'Some error' },
          }}
          authenticatorState={{
            ...initialAuthenticatorState,
          }}
        />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with ssrBlogs', () => {
    const { container } = render(
      <Provider store={store}>
        <BlogList
          logout={spy}
          loadBlogs={spy}
          deleteBlog={spy}
          linkPrefix="/blog"
          ssrBlogs={testBlogs}
          blogListState={{
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
  it('should render correctly with blogs', () => {
    const { container } = render(
      <Provider store={store}>
        <BlogList
          logout={spy}
          loadBlogs={spy}
          deleteBlog={spy}
          linkPrefix="/blog"
          blogListState={{
            ...initialState,
            blogs: testBlogs,
          }}
          authenticatorState={{
            ...initialAuthenticatorState,
          }}
        />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly authenticated with blogs', () => {
    const { container } = render(
      <Provider store={store}>
        <BlogList
          logout={spy}
          loadBlogs={spy}
          deleteBlog={spy}
          linkPrefix="/blog"
          blogListState={{
            ...initialState,
            blogs: testBlogs,
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
