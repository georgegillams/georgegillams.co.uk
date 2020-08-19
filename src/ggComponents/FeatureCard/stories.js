import React from 'react';
import { storiesOf } from '@storybook/react';

import { FeatureCard, FEATURE_CARD_LAYOUTS } from './index';

const image = 'https://via.placeholder.com/460x460/red/white?text=image';
const backgroundImage = 'https://via.placeholder.com/460x210/blue/black?text=image';

storiesOf('Feature card', module)
  .add('Default', () => (
    <FeatureCard annotations={['23', 'Jan']} href="/test" title="Title here" imageBorder="orchid" imageSrc={image} />
  ))
  .add('Narrow', () => (
    <FeatureCard
      layout={FEATURE_CARD_LAYOUTS.narrow}
      annotations={['23', 'Jan']}
      href="/test"
      title="Title here"
      imageBorder="orchid"
      imageSrc={image}
    />
  ))
  .add('Narrow compact', () => (
    <FeatureCard
      layout={FEATURE_CARD_LAYOUTS.narrowCompact}
      annotations={['23', 'Jan']}
      href="/test"
      title="Title here"
      imageBorder="orchid"
      imageSrc={image}
    />
  ))
  .add('Narrow compact - no image', () => (
    <FeatureCard
      layout={FEATURE_CARD_LAYOUTS.narrowCompact}
      annotations={['23', 'Jan']}
      href="/test"
      title="Title here"
      imageBorder="orchid"
    />
  ))
  .add('With fill image', () => (
    <FeatureCard
      annotations={['23', 'Jan']}
      fillImageSrc={backgroundImage}
      href="/test"
      title="Title here"
      imageBorder="orchid"
      imageSrc={image}
    />
  ))
  .add('With banner colour', () => (
    <FeatureCard
      annotations={['23', 'Jan']}
      href="/test"
      title="Title here"
      imageBorder="orchid"
      imageSrc={image}
      bannerColor="red"
    />
  ))
  .add('Without image', () => (
    <FeatureCard annotations={['23', 'Jan']} href="/test" title="Title here" imageBorder="orchid" bannerColor="red" />
  ))
  .add('Light', () => (
    <FeatureCard
      annotations={['23', 'Jan']}
      href="/test"
      title="Title here"
      imageBorder="orchid"
      imageSrc={image}
      light
    />
  ))
  .add('Disabled', () => (
    <FeatureCard
      annotations={['23', 'Jan']}
      href="/test"
      title="Title here"
      imageBorder="orchid"
      imageSrc={image}
      disabled
    />
  ))
  .add('With href', () => (
    <FeatureCard annotations={['23', 'Jan']} href="/test" title="Title here" imageBorder="orchid" imageSrc={image} />
  ));
