import React from 'react';
import { storiesOf } from '@storybook/react';

import { ObjectAsList } from './index';

storiesOf('Object as list', module).add('default', () => (
  <ObjectAsList
    name="Geoff"
    value={{
      id: 'test-01',
      timestamp: new Date(2019, 10, 11, 5, 6, 7),
      lastUpdatedTimestamp: new Date(2019, 10, 11, 5, 6, 7),
      authorId: 'Me',
      unspecifiedKey: 'testValue',
      unspecifiedObjectKey: { test1: '1', test2: '2' },
    }}
  />
));
