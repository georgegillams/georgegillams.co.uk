import React from 'react';

import { render } from '@testing-library/react';

import { BlogCard, BlogsList } from '..';

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

describe('<BlogCard />', () => {
  it('Should render correctly', () => {
    const { container } = render(<BlogCard linkPrefix="/blog" blog={testBlogs[0]} />);

    expect(container).toMatchSnapshot();
  });

  it('Should render correctly with all parameters supplied', () => {
    const { container } = render(<BlogCard linkPrefix="/blog" blog={testBlogs[1]} />);

    expect(container).toMatchSnapshot();
  });

  it('Should render correctly when deleted', () => {
    const { container } = render(<BlogCard linkPrefix="/blog" blog={testBlogs[2]} />);

    expect(container).toMatchSnapshot();
  });

  it('Should render correctly with custom className', () => {
    const { container } = render(
      <BlogCard linkPrefix="/blog" blog={testBlogs[0]} className={'test-custom-classname'} />
    );

    expect(container).toMatchSnapshot();
  });
});

describe('<BlogsList />', () => {
  it('Should render correctly', () => {
    const { container } = render(<BlogsList linkPrefix="/blog" blogs={testBlogs} />);

    expect(container).toMatchSnapshot();
  });
  it('Should render correctly with deleteBlog function', () => {
    const { container } = render(<BlogsList linkPrefix="/blog" blogs={testBlogs} deleteBlog={() => null} />);

    expect(container).toMatchSnapshot();
  });
  it('Should render correctly with custom className', () => {
    const { container } = render(
      <BlogsList linkPrefix="/blog" blogs={testBlogs} className={'test-custom-classname'} />
    );

    expect(container).toMatchSnapshot();
  });
});
