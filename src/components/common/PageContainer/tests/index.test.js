import React from 'react';

import { render } from '@testing-library/react';

import PageContainer, { LAYOUT_STYLES } from '..';

describe('<PageContainer />', () => {
  const children = <div>some text</div>;

  it('Should render correctly', () => {
    const { container } = render(<PageContainer>{children}</PageContainer>);

    expect(container).toMatchSnapshot();
  });

  it('Should render correctly with custom className', () => {
    const { container } = render(<PageContainer className={'test-custom-classname'}>{children}</PageContainer>);

    expect(container).toMatchSnapshot();
  });

  it('Should render correctly with prose', () => {
    const { container } = render(<PageContainer layout={LAYOUT_STYLES.prose}>{children}</PageContainer>);

    expect(container).toMatchSnapshot();
  });

  it('Should render correctly with defaultCenter', () => {
    const { container } = render(<PageContainer layout={LAYOUT_STYLES.defaultCenter}>{children}</PageContainer>);

    expect(container).toMatchSnapshot();
  });
});
