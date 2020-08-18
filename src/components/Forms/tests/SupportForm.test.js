import React from 'react';
import { render } from '@testing-library/react';

import { SupportForm } from '..';

describe('<SupportForm />', () => {
  it('Should render correctly', () => {
    const { container } = render(
      <SupportForm link={{ id: 'some-link', name: 'name 1' }} onDataChanged={() => null} onSubmit={() => null} />
    );

    expect(container).toMatchSnapshot();
  });

  it('Should render correctly with no link id', () => {
    const { container } = render(<SupportForm link={{}} onDataChanged={() => null} onSubmit={() => null} />);

    expect(container).toMatchSnapshot();
  });
});
