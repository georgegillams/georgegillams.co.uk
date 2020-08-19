import React from 'react';
import { storiesOf } from '@storybook/react';

import { cssModules } from '../helpers/cssModules';

import STYLES from './stories.module.scss';

import { Countdown, CountdownDumb } from './index';

const getClassName = cssModules(STYLES);

storiesOf('Countdown dumb', module)
  .add('Default - tomorrow', () => <CountdownDumb millis={86387125} />)
  .add('Default - oneWeek', () => <CountdownDumb millis={604766461} />)
  .add('Default - oneWeekAgo', () => <CountdownDumb millis={-604842403} />)
  .add('Default - coloured', () => <CountdownDumb textClassName={getClassName('stories__text')} millis={604842403} />)
  .add('CompleteMessage - oneWeekAgo', () => <CountdownDumb millis={-604842403} completeMessage="Timer finished!" />)
  .add('Paused - oneWeekAgo', () => <CountdownDumb millis={-604766461} paused />)
  .add('Paused - oneWeek', () => <CountdownDumb millis={604766461} paused />)
  .add('Paused - oneWeek coloured', () => (
    <CountdownDumb textClassName={getClassName('stories__text')} millis={604766461} paused />
  ));

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

const oneWeek = new Date();
oneWeek.setDate(oneWeek.getDate() + 7);

const oneWeekAgo = new Date();
oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

storiesOf('Countdown', module)
  .add('Default - tomorrow', () => <Countdown toUTCTimestamp={tomorrow.getTime()} />)
  .add('Default - oneWeek', () => <Countdown toUTCTimestamp={oneWeek.getTime()} />)
  .add('Default - oneWeekAgo', () => <Countdown toUTCTimestamp={oneWeekAgo.getTime()} />)
  .add('CompleteMessage - oneWeekAgo', () => (
    <Countdown toUTCTimestamp={oneWeekAgo.getTime()} completeMessage="Time finished!" />
  ));
