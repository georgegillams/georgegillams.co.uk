/* eslint-disable react/prop-types */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Button } from './index';

const ButtonStory = props => {
  const { dark, ...rest } = props;

  return (
    <div
      style={{
        backgroundColor: dark ? '#1e1e1e' : 'transparent',
      }}>
      <Button onClick={action('Button clicked')} {...rest}>
        Button
      </Button>
    </div>
  );
};

storiesOf('Button', module)
  .add('Primary', () => <ButtonStory />)
  .add('Large', () => <ButtonStory large />)
  .add('Secondary', () => <ButtonStory secondary />)
  .add('Bouncy', () => <ButtonStory bouncy />)
  .add('Destructive', () => <ButtonStory destructive />)
  .add('Disabled', () => <ButtonStory disabled />)
  .add('White', () => <ButtonStory dark white />)
  .add('href', () => <ButtonStory href="/test" />)
  .add('External href', () => <ButtonStory hrefExternal href="https://duckduckgo.com/" />)
  .add('Dumb href', () => <ButtonStory hrefDumb href="https://duckduckgo.com/" />);
