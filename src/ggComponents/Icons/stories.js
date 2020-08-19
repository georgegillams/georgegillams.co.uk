import React from 'react';
import { storiesOf } from '@storybook/react';

import { Copy, NewWindow, Tick, ExclamationCircle } from './index';

storiesOf('Icons', module)
  .add('exclamation circle', () => <ExclamationCircle />)
  .add('copy', () => <Copy />)
  .add('tick', () => <Tick />)
  .add('new window', () => <NewWindow />);
