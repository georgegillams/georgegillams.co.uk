import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { initialState as initialAuthenticatorState } from 'containers/common/Authenticator/reducer';
import { initialState } from '../reducer';

import configureStore from 'utils/common/redux/configure-store';

import BlogRendererIndex from '../index';
import BlogRenderer from '../Container';

const testBlog = {
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
  content: 'Some content with [a link](https://duckduckgo.com/)',
};

describe('<BlogRenderer />', () => {
  let store;
  const spy = jest.fn();

  beforeAll(() => {
    store = configureStore({});
  });

  it('should render correctly - index', () => {
    const { container } = render(
      <Provider store={store}>
        <BlogRendererIndex linkPrefix="/blogs" blogSubcategory="Blogs" />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with initial state', () => {
    const { container } = render(
      <Provider store={store}>
        <BlogRenderer
          loadBlog={spy}
          updateBlog={spy}
          linkPrefix="/blogs"
          blogSubcategory="Blogs"
          blogId={testBlog.id}
          blogRenderState={{
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
        <BlogRenderer
          loadBlog={spy}
          updateBlog={spy}
          linkPrefix="/blogs"
          blogSubcategory="Blogs"
          blogId={testBlog.id}
          blogRenderState={{
            ...initialState,
            loadBlogError: { error: 'not_found', errorMessage: 'Some error' },
          }}
          authenticatorState={{
            ...initialAuthenticatorState,
          }}
        />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with blog and admin', () => {
    const { container } = render(
      <Provider store={store}>
        <BlogRenderer
          loadBlog={spy}
          updateBlog={spy}
          linkPrefix="/blogs"
          blogSubcategory="Blogs"
          blogId={testBlog.id}
          blogRenderState={{
            ...initialState,
            blogs: { [testBlog.id]: testBlog },
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

  it('should render correctly with blog', () => {
    const { container } = render(
      <Provider store={store}>
        <BlogRenderer
          loadBlog={spy}
          updateBlog={spy}
          linkPrefix="/blogs"
          blogSubcategory="Blogs"
          blogId={testBlog.id}
          blogRenderState={{
            ...initialState,
            blogs: { [testBlog.id]: testBlog },
          }}
          authenticatorState={{
            ...initialAuthenticatorState,
          }}
        />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with ssrBlog', () => {
    const { container } = render(
      <Provider store={store}>
        <BlogRenderer
          loadBlog={spy}
          updateBlog={spy}
          linkPrefix="/blogs"
          blogSubcategory="Blogs"
          ssrBlog={testBlog}
          blogId={testBlog.id}
          blogRenderState={{
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
});
