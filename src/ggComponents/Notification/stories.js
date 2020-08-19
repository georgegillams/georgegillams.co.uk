import React from 'react';
import { storiesOf } from '@storybook/react';

import { MarkdownRenderer } from '../MarkdownRenderer';

import { Notification, NOTIFICATION_TYPES } from './index';

storiesOf('Notifications', module)
  .add('Notification - simple success', () => (
    <Notification type={NOTIFICATION_TYPES.success}>Simple text</Notification>
  ))
  .add('Notification - simple warn', () => <Notification type={NOTIFICATION_TYPES.warn}>Simple text</Notification>)
  .add('Notification - simple error', () => <Notification type={NOTIFICATION_TYPES.error}>Simple text</Notification>)
  .add('Notification - markdown', () => (
    <Notification type={NOTIFICATION_TYPES.warn}>
      <MarkdownRenderer content="Hi. Here's a [link](https://www.google.com/)" />
    </Notification>
  ));
