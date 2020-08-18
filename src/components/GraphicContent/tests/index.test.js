import React from 'react';

import { render } from '@testing-library/react';

import GraphicContent from '..';

describe('<GraphicContent />', () => {
  it('Should render correctly', () => {
    const { container } = render(
      <GraphicContent>
        <span>Test</span>
      </GraphicContent>
    );

    expect(container).toMatchSnapshot();
  });

  it('Should render correctly with contentInView', () => {
    const { container } = render(
      <GraphicContent graphicContentInView>
        <span>Test</span>
      </GraphicContent>
    );

    expect(container).toMatchSnapshot();
  });

  it('Should render correctly with alwaysShow', () => {
    const { container } = render(
      <GraphicContent alwaysShowGraphicContent>
        <span>Test</span>
      </GraphicContent>
    );

    expect(container).toMatchSnapshot();
  });

  it('Should render correctly with custom className', () => {
    const { container } = render(
      <GraphicContent className="test-custom-className">
        <span>Test</span>
      </GraphicContent>
    );

    expect(container).toMatchSnapshot();
  });
});
