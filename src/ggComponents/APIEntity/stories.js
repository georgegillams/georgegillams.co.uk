import React from 'react';
import { storiesOf } from '@storybook/react';

import { APIEntity } from './index';

storiesOf('API entity', module).add('default', () => (
  <APIEntity
    entityType="Thing type"
    name="Geoff"
    entity={{
      id: 'test-01',
      timestamp: new Date(2019, 5, 4, 5, 6, 7),
      lastUpdatedTimestamp: new Date(2019, 5, 5, 5, 6, 7),
      authorId: 'Me',
      unspecifiedKey: 'testValue',
      unspecifiedObjectKey: { test1: '1', test2: '2' },
    }}
  />
));
