import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { TextLink } from '../TextLink';

import { InfoCell, INFO_CELL_STYLES } from './index';

const StatefulStory = props => {
  const [hasBeenMostlyInView, setHasBeenMostlyInView] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setHasBeenMostlyInView(!hasBeenMostlyInView);
        }}>
        Toggle
      </button>
      <InfoCell hasBeenMostlyInView={hasBeenMostlyInView} {...props} />
    </div>
  );
};

storiesOf('Info cell', module)
  .add('Info cell', () => (
    <StatefulStory
      title="Title"
      content={<TextLink href="/test">Content</TextLink>}
      aux={<div style={{ width: '5rem', height: '5rem', backgroundColor: 'red' }} />}
    />
  ))
  .add('No aux', () => <InfoCell title="Title" content={<TextLink href="/test">Content</TextLink>} />)
  .add('No aux dark', () => (
    <InfoCell title="Title" cellStyle={INFO_CELL_STYLES.dark} content={<TextLink href="/test">Content</TextLink>} />
  ));
