import React from 'react';
import { storiesOf } from '@storybook/react';

import { Tag, TAG_TYPES } from './index';

storiesOf('Tags', module)
  .add('Tech', () => <Tag type={TAG_TYPES.tech}>A tech tag</Tag>)
  .add('Travel', () => <Tag type={TAG_TYPES.travel}>A travel tag</Tag>)
  .add('Photography', () => <Tag type={TAG_TYPES.photography}>A photography tag</Tag>)
  .add('Events', () => <Tag type={TAG_TYPES.events}>A events tag</Tag>)
  .add('Security', () => <Tag type={TAG_TYPES.security}>A security tag</Tag>);
