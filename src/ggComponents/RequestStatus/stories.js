import React from 'react';
import { storiesOf } from '@storybook/react';

import { RequestStatusContainer } from './index';

storiesOf('Request status', module)
  .add('Success', () => (
    <RequestStatusContainer
      statuses={[
        { type: 'success', message: 'Cool bananas' },
        { type: 'success', message: 'Everything is looking 👌' },
        { type: 'success', message: 'Nothing broke' },
      ]}
    />
  ))
  .add('Warn', () => (
    <RequestStatusContainer
      statuses={[
        { type: 'warn', message: 'Oh shucks' },
        { type: 'warn', message: 'Something feels wrong 🙈' },
        { type: 'warn', message: 'Wait for it...' },
      ]}
    />
  ))
  .add('Error', () => (
    <RequestStatusContainer
      statuses={[
        { type: 'error', message: 'Dang' },
        { type: 'error', message: 'Not looking good 🥴' },
        { type: 'error', message: 'Houston we have a problem.' },
      ]}
    />
  ));
