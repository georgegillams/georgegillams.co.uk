import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { initialState as initialAuthenticatorState } from 'containers/common/Authenticator/reducer';
import { initialState as initialBlogListState } from 'containers/BlogList/reducer';

import configureStore from 'client-utils/common/redux/configure-store';

import SiteMap from '../Container';
import SiteMapIndex from '../index';

const testBlogs = [
  {
    title: 'Blog 1 🎉',
    id: 'asdfg',
    published: true,
    showInBlogsList: true,
  },
  {
    id: 'asdfg',
    published: false,
    showInBlogsList: false,
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
    showInBlogsList: false,
    showInTravelBlogsList: true,
    blogBannerColor: '#01579b',
    publishedTimestamp: '1577422800',
    lastUpdatedTimestamp: 1595000996720,
  },
  {
    tags: ['tech'],
    requestedId: 'coding-all-the-code',
    deleted: true,
    id: 'mndyd8',
    timestamp: 1595000996720,
    authorId: 'direct_API_invocator',
    blogImage: 'https://i.imgur.com/ppPEuDs.jpg',
    blogCardDate: '23-30',
    published: true,
    showInBlogsList: true,
    showInTravelBlogsList: false,
    blogBannerColor: '#01579b',
    publishedTimestamp: '1577422800',
    lastUpdatedTimestamp: 1595000996720,
  },
];

describe('<SiteMap />', () => {
  let store;
  const spy = jest.fn();

  beforeAll(() => {
    store = configureStore({});
  });

  it('should render correctly - index', () => {
    const { container } = render(
      <Provider store={store}>
        <SiteMapIndex />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });
  it('should render correctly', () => {
    const { container } = render(<SiteMap loadBlogs={spy} />);

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with ssrBlogs', () => {
    const { container } = render(
      <SiteMap loadBlogs={spy} ssrBlogs={testBlogs} blogListState={{ ...initialBlogListState }} />
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with blogs', () => {
    const { container } = render(
      <SiteMap loadBlogs={spy} blogListState={{ ...initialBlogListState, blogs: testBlogs }} />
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with blogs and admin user', () => {
    const { container } = render(
      <SiteMap
        loadBlogs={spy}
        blogListState={{ ...initialBlogListState, blogs: testBlogs }}
        authenticatorState={{ ...initialAuthenticatorState, user: { admin: true } }}
      />
    );

    expect(container).toMatchSnapshot();
  });
});
