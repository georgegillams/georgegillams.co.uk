import React from 'react';
import { storiesOf } from '@storybook/react';

import { cssModules } from '../helpers/cssModules';

import STYLES from './stories.module.scss';

import { TextLink } from './index';

const getClassName = cssModules(STYLES);

storiesOf('Text link', module)
  .add('Default', () => (
    <TextLink href="/lol" name="Test">
      Test
    </TextLink>
  ))
  .add('Dumb', () => (
    <TextLink hrefDumb href="/lol" name="Test">
      Test
    </TextLink>
  ))
  .add('External', () => (
    <div>
      This is an external link to{' '}
      <TextLink hrefExternal href="/lol" name="Test">
        Test
      </TextLink>{' '}
      content on another site.
    </div>
  ))
  .add('Light external', () => (
    <TextLink light hrefExternal href="/lol" name="Test">
      Test
    </TextLink>
  ))
  .add('Themed', () => (
    <div className={getClassName('stories__themed')}>
      <TextLink hrefExternal href="/lol" name="Test">
        Test
      </TextLink>
    </div>
  ));
