import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Progress } from './index';

const INTERACTIVE_INCREMENT = 33;

const StatefulProgress = props => {
  const [progress, setProgress] = useState(0);

  return (
    <div>
      <Progress progress={progress} {...props} />
      {progress < 100 && (
        <button
          type="button"
          onClick={() => {
            setProgress(progress + INTERACTIVE_INCREMENT);
          }}>
          Increment
        </button>
      )}
      {progress >= 100 && (
        <button
          type="button"
          onClick={() => {
            setProgress(0);
          }}>
          Reset
        </button>
      )}
    </div>
  );
};

storiesOf('Progress', module)
  .add('Default', () => <Progress progress={50} />)
  .add('Error', () => <Progress error progress={50} />)
  .add('Stateful', () => <StatefulProgress />);
