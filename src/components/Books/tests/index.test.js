import React from 'react';

import { render } from '@testing-library/react';

import { BookCard, BooksList } from '..';

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

describe('<BookCard />', () => {
  it('Should render correctly', () => {
    const { container } = render(<BookCard book={testBooks[0]} />);

    expect(container).toMatchSnapshot();
  });

  it('Should render correctly with all parameters supplied', () => {
    const { container } = render(<BookCard book={testBooks[1]} />);

    expect(container).toMatchSnapshot();
  });

  it('Should render correctly when deleted', () => {
    const { container } = render(<BookCard book={testBooks[2]} />);

    expect(container).toMatchSnapshot();
  });

  it('Should render correctly with custom className', () => {
    const { container } = render(<BookCard book={testBooks[0]} className={'test-custom-classname'} />);

    expect(container).toMatchSnapshot();
  });
});

describe('<BooksList />', () => {
  it('Should render correctly', () => {
    const { container } = render(<BooksList books={testBooks} />);

    expect(container).toMatchSnapshot();
  });
  it('Should render correctly with deleteBook function', () => {
    const { container } = render(<BooksList books={testBooks} deleteBook={() => null} />);

    expect(container).toMatchSnapshot();
  });
  it('Should render correctly with custom className', () => {
    const { container } = render(<BooksList books={testBooks} className={'test-custom-classname'} />);

    expect(container).toMatchSnapshot();
  });
});
