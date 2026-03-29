import React from 'react';
import { render } from '@testing-library/react';

import Medals from '../Container';

describe('<Medals />', () => {
  it('should render correctly', () => {
    const noop = () => {};
    const { getByText } = render(
      <Medals
        loadMedals={noop}
        createMedal={noop}
        updateMedal={noop}
        deleteMedal={noop}
        authenticatorState={{ user: null }}
        medalsState={{ medals: [], loadMedalsError: null }}
      />
    );

    expect(getByText('Races')).toBeTruthy();
  });
});
