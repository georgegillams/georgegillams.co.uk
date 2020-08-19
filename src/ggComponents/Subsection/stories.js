import React from 'react';
import { storiesOf } from '@storybook/react';

import { cssModules } from '../helpers/cssModules';

import STYLES from './stories.module.scss';

import { Subsection } from './index';

const getClassName = cssModules(STYLES);

const LONG_TEXT =
  'LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT, SED DO EIUSMOD TEMPOR INCIDIDUNT UT LABORE ET DOLORE MAGNA ALIQUA.';

storiesOf('Subsection', module)
  .add('Default', () => <Subsection name="Test" />)
  .add('Long', () => <Subsection name={LONG_TEXT} />)
  .add('Without anchor', () => <Subsection name="Test" anchor={false} />)
  .add('No padding', () => <Subsection noPadding name="Test" />)
  .add('With content and padding', () => <Subsection name="Test">Some content</Subsection>)
  .add('Highlight', () => (
    <Subsection anchor highlight name="Test">
      Some content
    </Subsection>
  ))
  .add('With content', () => (
    <Subsection noPadding name="Test">
      Some content
    </Subsection>
  ))
  .add('themed', () => (
    <div className={getClassName('stories__themed')}>
      <Subsection anchor name="Test">
        Some content
      </Subsection>
    </div>
  ));
