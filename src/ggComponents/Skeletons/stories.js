import React from 'react';
import { storiesOf } from '@storybook/react';

import {
  ButtonSkeleton,
  CardSkeleton,
  CheckboxSkeleton,
  CompactCardSkeleton,
  InfoCellSkeleton,
  InputSkeleton,
  NotificationSkeleton,
  ProgressSkeleton,
  SectionSkeleton,
  SmallButtonSkeleton,
  SmallProgressSkeleton,
  SubSectionSkeleton,
  TextLinkSkeleton,
  TicketStatusSkeleton,
} from './index';

storiesOf('Skeletons', module)
  .add('ButtonSkeleton', () => <ButtonSkeleton />)
  .add('CardSkeleton', () => <CardSkeleton />)
  .add('CheckboxSkeleton', () => <CheckboxSkeleton />)
  .add('CompactCardSkeleton', () => <CompactCardSkeleton />)
  .add('InfoCellSkeleton', () => <InfoCellSkeleton />)
  .add('InputSkeleton', () => <InputSkeleton />)
  .add('NotificationSkeleton', () => <NotificationSkeleton />)
  .add('ProgressSkeleton', () => <ProgressSkeleton />)
  .add('SectionSkeleton', () => <SectionSkeleton />)
  .add('SmallButtonSkeleton', () => <SmallButtonSkeleton />)
  .add('SmallProgressSkeleton', () => <SmallProgressSkeleton />)
  .add('SubSectionSkeleton', () => <SubSectionSkeleton />)
  .add('TextLinkSkeleton', () => <TextLinkSkeleton />)
  .add('TicketStatusSkeleton', () => <TicketStatusSkeleton />)
  .add('Combination', () => (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      <ButtonSkeleton />
      <CardSkeleton />
      <CheckboxSkeleton />
      <CompactCardSkeleton style={{ marginLeft: '15rem' }} />
      <CompactCardSkeleton style={{ marginLeft: '30rem' }} />
      <CompactCardSkeleton style={{ marginLeft: '45rem' }} />
    </div>
  ));
