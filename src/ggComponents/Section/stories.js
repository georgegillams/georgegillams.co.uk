import React from 'react';
import { storiesOf } from '@storybook/react';

import { cssModules } from '../helpers/cssModules';

import STYLES from './stories.module.scss';

import { Section } from './index';

const LONG_TEXT =
  'LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT, SED DO EIUSMOD TEMPOR INCIDIDUNT UT LABORE ET DOLORE MAGNA ALIQUA.';

const getClassName = cssModules(STYLES);

storiesOf('Section', module)
  .add('Default', () => <Section name="Test" />)
  .add('Long', () => <Section name={LONG_TEXT} />)
  .add('With anchor', () => <Section anchor name="Test" />)
  .add('No padding', () => <Section anchor noPadding name="Test" />)
  .add('With content and padding', () => (
    <Section anchor name="Test">
      Some content
    </Section>
  ))
  .add('With content', () => (
    <Section noPadding anchor name="Test">
      Some content
    </Section>
  ))
  .add('Themed', () => (
    <div className={getClassName('stories__themed')}>
      {' '}
      <Section anchor highlight name="Test" />
    </div>
  ))
  .add('Highlight', () => <Section anchor highlight name="Test" />)
  .add('No padding no anchor', () => <Section anchor={false} noPadding name="Test" />)
  .add('Link', () => <Section anchor={false} noPadding name="Test" link />);
