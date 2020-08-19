import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import ImageDumb from './ImageDumb';

import { Image } from './index';

const StatefulImageDumb = props => {
  const [hidden, setHidden] = useState(true);

  return (
    <>
      <ImageDumb hidden={hidden} {...props} />
      <button
        type="button"
        onClick={() => {
          setHidden(!hidden);
        }}>
        {hidden ? 'Show' : 'Hide'}
      </button>
    </>
  );
};

storiesOf('Image - dumb', module)
  .add('Default', () => (
    <ImageDumb
      aspectX={460}
      aspectY={210}
      lightSrc="https://via.placeholder.com/460x210/red/white?text=image"
      darkSrc="https://via.placeholder.com/460x210/blue/black?text=image"
      imgProps={{
        alt: 'Some description',
      }}
    />
  ))
  .add('Server', () => (
    <ImageDumb
      aspectX={460}
      aspectY={210}
      lightSrc="https://via.placeholder.com/460x210/red/white?text=image"
      darkSrc="https://via.placeholder.com/460x210/blue/black?text=image"
      imgProps={{
        alt: 'Some description',
      }}
      isServer
    />
  ))
  .add('With img className', () => (
    <ImageDumb
      aspectX={460}
      aspectY={210}
      lightSrc="https://via.placeholder.com/460x210/red/white?text=image"
      darkSrc="https://via.placeholder.com/460x210/blue/black?text=image"
      imgProps={{
        alt: 'Some description',
        className: 'test',
      }}
    />
  ))
  .add('Width percent', () => (
    <ImageDumb
      aspectX={460}
      aspectY={210}
      lightSrc="https://via.placeholder.com/460x210/red/white?text=image"
      darkSrc="https://via.placeholder.com/460x210/blue/black?text=image"
      imgProps={{
        alt: 'Some description',
      }}
      style={{ width: '70%' }}
    />
  ))
  .add('Width absolute', () => (
    <ImageDumb
      aspectX={460}
      aspectY={210}
      lightSrc="https://via.placeholder.com/460x210/red/white?text=image"
      darkSrc="https://via.placeholder.com/460x210/blue/black?text=image"
      imgProps={{
        alt: 'Some description',
      }}
      style={{ width: '35rem' }}
    />
  ))
  .add('Stateful', () => (
    <StatefulImageDumb
      aspectX={460}
      aspectY={210}
      lightSrc="https://via.placeholder.com/460x210/red/white?text=image"
      darkSrc="https://via.placeholder.com/460x210/blue/black?text=image"
      imgProps={{
        alt: 'Some description',
      }}
    />
  ))
  .add('Hidden', () => (
    <ImageDumb
      hidden
      aspectX={460}
      aspectY={210}
      lightSrc="https://via.placeholder.com/460x210/red/white?text=image"
      darkSrc="https://via.placeholder.com/460x210/blue/black?text=image"
      imgProps={{
        alt: 'Some description',
      }}
    />
  ))
  .add('Hidden width percent', () => (
    <ImageDumb
      hidden
      aspectX={460}
      aspectY={210}
      lightSrc="https://via.placeholder.com/460x210/red/white?text=image"
      darkSrc="https://via.placeholder.com/460x210/blue/black?text=image"
      imgProps={{
        alt: 'Some description',
      }}
      style={{ width: '70%' }}
    />
  ))
  .add('Hidden width absolute', () => (
    <ImageDumb
      hidden
      aspectX={460}
      aspectY={210}
      lightSrc="https://via.placeholder.com/460x210/red/white?text=image"
      darkSrc="https://via.placeholder.com/460x210/blue/black?text=image"
      imgProps={{
        alt: 'Some description',
      }}
      style={{ width: '35rem' }}
    />
  ))
  .add('Down the page', () => (
    <>
      <div style={{ height: '50rem', width: '100%', background: 'red' }} />
      <ImageDumb
        aspectX={460}
        aspectY={210}
        lightSrc="https://live.staticflickr.com/65535/49195241431_7880522df6_k.jpg"
        darkSrc="https://live.staticflickr.com/65535/49195241431_7880522df6_k.jpg"
        imgProps={{
          alt: 'Some description',
        }}
      />
    </>
  ));

storiesOf('Image', module)
  .add('Default', () => (
    <Image
      aspectX={460}
      aspectY={210}
      lightSrc="https://via.placeholder.com/460x210/red/white?text=image"
      darkSrc="https://via.placeholder.com/460x210/blue/black?text=image"
      imgProps={{
        alt: 'Some description',
      }}
    />
  ))
  .add('Server', () => (
    <Image
      isServer
      aspectX={460}
      aspectY={210}
      lightSrc="https://via.placeholder.com/460x210/red/white?text=image"
      darkSrc="https://via.placeholder.com/460x210/blue/black?text=image"
      imgProps={{
        alt: 'Some description',
      }}
    />
  ));
