import React from 'react';
import { storiesOf } from '@storybook/react';

import { cssModules } from '../helpers/cssModules';

import STYLES from './stories.module.scss';

import { Quote } from './index';

const getClassName = cssModules(STYLES);

storiesOf('Quote', module)
  .add('default', () => <Quote>Lorem ipse dolor sit amet.</Quote>)
  .add('themed', () => (
    <div className={getClassName('stories__themed')}>
      <Quote>Lorem ipse dolor sit amet.</Quote>
    </div>
  ));
