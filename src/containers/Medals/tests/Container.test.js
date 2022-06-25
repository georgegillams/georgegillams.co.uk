import React from 'react';
import { render } from '@testing-library/react';

import Medals from '../Container';

describe('<Medals />', () => {
  it('should render correctly', () => {
    const { container } = render(<Medals />);

    expect(container).toMatchSnapshot();
  });
});
