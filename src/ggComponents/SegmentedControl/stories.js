/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { cssModules } from '../helpers/cssModules';

import STYLES from './stories.module.scss';

import { SegmentedControl } from './index';

const getClassName = cssModules(STYLES);

const SegmentedControlStory = props => {
  const { className, selectedIndex: initiallySelectedIndex, ...rest } = props;

  const [selectedIndex, setSelectedIndex] = useState(initiallySelectedIndex);

  const options = [
    {
      label: 'True',
      key: 'true_opt',
    },
    {
      label: 'False',
      key: 'false_opt',
    },
  ];

  return (
    <SegmentedControl selectedIndex={selectedIndex} onSelectionChanged={setSelectedIndex} options={options} {...rest} />
  );
};

storiesOf('Segmented control', module)
  .add('Default', () => <SegmentedControlStory />)
  .add('With selection', () => <SegmentedControlStory selectedIndex={0} />)
  .add('Deselection enabled', () => <SegmentedControlStory enableDeselection />)
  .add('Themed', () => (
    <div className={getClassName('stories__themed')}>
      <SegmentedControlStory selectedIndex={0} />
    </div>
  ));
