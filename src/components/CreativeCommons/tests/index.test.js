import React from 'react';

import { render } from '@testing-library/react';

import CreativeCommons from '..';

describe('<CreativeCommons />', () => {
  it('Should render correctly', () => {
    const { container } = render(<CreativeCommons />);

    expect(container).toMatchSnapshot();
  });
  it('Should render correctly with custom className', () => {
    const { container } = render(<CreativeCommons className="test-custom-className" />);

    expect(container).toMatchSnapshot();
  });
});
