import React from 'react';
import { storiesOf } from '@storybook/react';

import { Paragraph } from '../Paragraph';

import { Error } from './index';

storiesOf('Error', module)
  .add('Error outside', () => (
    <Error>
      <Paragraph>Lorem ipsum dolor sit amet</Paragraph>
    </Error>
  ))
  .add('Error inside', () => (
    <Paragraph>
      <Error>Lorem ipsum dolor sit amet</Error>
    </Paragraph>
  ));
