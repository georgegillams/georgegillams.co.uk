import React from 'react';
import { render } from '@testing-library/react';

import { BlogForm } from '..';

describe('<BlogForm />', () => {
  it('Should render correctly', () => {
    const { container } = render(
      <BlogForm blog={{ id: 'some-blog' }} onDataChanged={() => null} onSubmit={() => null} />
    );

    expect(container).toMatchSnapshot();
  });

  it('Should render correctly with no blog id', () => {
    const { container } = render(<BlogForm blog={{}} onDataChanged={() => null} onSubmit={() => null} />);

    expect(container).toMatchSnapshot();
  });
});
