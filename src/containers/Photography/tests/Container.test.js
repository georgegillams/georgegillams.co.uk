import React from 'react';
import { render } from '@testing-library/react';

import Photography from '../Container';

describe('<Photography />', () => {
  it('should render correctly', () => {
    const { container } = render(<Photography />);

    expect(container).toMatchSnapshot();
  });
});
