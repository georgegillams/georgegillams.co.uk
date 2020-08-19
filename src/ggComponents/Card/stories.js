import React from 'react';
import { storiesOf } from '@storybook/react';

import { Section } from '../Section';

import backgroundImage from './backgroundImage.png';

import { Card } from './index';

storiesOf('Card', module)
  .add('Default', () => (
    <Card href="/test">
      <Section noPadding name="Test" />
    </Card>
  ))
  .add('Highlighted', () => (
    <Card highlighted href="/test">
      <Section noPadding name="Test" />
    </Card>
  ))
  .add('Unpadded', () => (
    <Card padded={false} href="/test">
      <Section noPadding name="Test" />
    </Card>
  ))
  .add('With fill image', () => (
    <Card fillImageSrc={backgroundImage} href="/test">
      <Section noPadding name="Test" />
    </Card>
  ))
  .add('With banner colour', () => (
    <Card href="/test" bannerColor="red">
      <Section noPadding name="Test" />
    </Card>
  ))
  .add('Light', () => (
    <Card href="/test" light>
      <Section noPadding name="Test" />
    </Card>
  ))
  .add('With href', () => (
    <Card href="/test">
      <Section noPadding name="Test" />
    </Card>
  ))
  .add('With dumb href', () => (
    <Card hrefDumb href="/test">
      <Section noPadding name="Test" />
    </Card>
  ))
  .add('Disabled', () => (
    <Card disabled>
      <Section disabled noPadding name="Test" />
    </Card>
  ))
  .add('Disabled with href', () => (
    <Card disabled href="/test">
      <Section noPadding name="Test" />
    </Card>
  ))
  .add('Disabled with href', () => (
    <Card disabled href="/test">
      <Section noPadding name="Test" />
    </Card>
  ));
