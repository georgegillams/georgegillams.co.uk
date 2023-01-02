import React from 'react';
import { render } from '@testing-library/react';

import Home from '../Container';

describe('<Home />', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ photos: [] }),
      })
    );
  });

  it('should render correctly', () => {
    const { container } = render(<Home authenticatorState={{ user: undefined }} />);

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with no user', () => {
    const { container } = render(<Home authenticatorState={{ user: null }} />);

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with user', () => {
    const { container } = render(<Home authenticatorState={{ user: {} }} />);

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with admin user', () => {
    const { container } = render(<Home authenticatorState={{ user: { admin: true } }} />);

    expect(container).toMatchSnapshot();
  });
});
