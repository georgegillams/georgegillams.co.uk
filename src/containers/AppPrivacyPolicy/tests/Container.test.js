import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import configureStore from 'client-utils/common/redux/configure-store';

import AppPrivacyPolicy from '../Container';

describe('<AppPrivacyPolicy />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({});
  });

  it('should render correctly - index', () => {
    const { container } = render(
      <Provider store={store}>
        <AppPrivacyPolicy />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});
