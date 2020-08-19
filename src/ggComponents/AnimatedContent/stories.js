import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { AnimatedContent } from './index';

const StatefulAnimatedContent = props => {
  const [inView, setInView] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setInView(!inView);
        }}>
        Toggle
      </button>
      <AnimatedContent inView={inView} {...props} />
    </div>
  );
};

storiesOf('Animated content', module)
  .add('In view', () => (
    <AnimatedContent inView>
      <div style={{ width: '100vw', height: '100vh', backgroundColor: 'red' }} />
    </AnimatedContent>
  ))
  .add('Out of view', () => (
    <AnimatedContent inView={false}>
      <div style={{ width: '100vw', height: '100vh', backgroundColor: 'red' }} />
    </AnimatedContent>
  ))
  .add('Stateful', () => (
    <StatefulAnimatedContent>
      <div style={{ width: '100vw', height: '100vh', backgroundColor: 'red' }} />
    </StatefulAnimatedContent>
  ));
