import React from 'react';
import { render } from '@testing-library/react';

import Coffee from '../Container';

describe('<Coffee />', () => {
  it('should render correctly', () => {
    const { container } = render(<Coffee />);

    expect(container).toMatchSnapshot();
  });
});
