import React from 'react';
import { storiesOf } from '@storybook/react';

import { Section } from '../Section';

import { DebugObject } from './index';

storiesOf('Debug object', module).add('default', () => (
  <div>
    <Section>Note this will only show if localStorage.showSessionDebugViews is true</Section>
    <DebugObject
      debugTitle="Geoff"
      debugObject={{
        id: 'test-01',
        timestamp: new Date(2019, 10, 11, 5, 6, 7),
        lastUpdatedTimestamp: new Date(2019, 10, 11, 5, 6, 7),
        authorId: 'Me',
        unspecifiedKey: 'testValue',
        unspecifiedObjectKey: { test1: '1', test2: '2' },
      }}
    />
  </div>
));
