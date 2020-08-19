import React from 'react';
import { storiesOf } from '@storybook/react';

import { Redirect } from './index';

storiesOf('Redirect', module)
  .add('Default', () => <Redirect name="You are now being redirected to our contact page" to="/contact" />)
  .add('External', () => <Redirect name="You are now being redirected to Flickr" to="https://flickr.com/" />);
