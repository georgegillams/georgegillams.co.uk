/* eslint-disable jsx-a11y/accessible-emoji */

import React from 'react';
import { storiesOf } from '@storybook/react';

import { Paragraph } from '../Paragraph';

import { BlurEffectView } from './index';

storiesOf('Blur effect view', module).add('Default', () => (
  <>
    <BlurEffectView idToTrack="scrollView" style={{ width: '100%', height: '5rem' }} />
    <div id="scrollView" style={{ width: '100%' }}>
      <a href="/iframe.html?id=blur-effect-view--default">OPEN IN FULL WINDOW MODE TO TEST SCROLL</a>
      <br />
      <Paragraph style={{ display: 'block', marginBottom: '2rem' }}>Lorem ipse</Paragraph>
      <br />
      <Paragraph style={{ display: 'block', marginBottom: '2rem' }}>Lorem ipse dolor sit amet</Paragraph>
      <br />
      <Paragraph style={{ display: 'block', marginBottom: '2rem' }}>Lorem ipsum dolor</Paragraph>
      <br />
      <Paragraph style={{ display: 'block', marginBottom: '2rem' }}>Lorem</Paragraph>
      <br />
      <Paragraph style={{ display: 'block', marginBottom: '2rem' }}>Ipsum</Paragraph>
      <br />
      <Paragraph style={{ display: 'block', marginBottom: '2rem' }}>Dolor</Paragraph>
      <br />
      <Paragraph style={{ display: 'block', marginBottom: '2rem' }}>Lorem ipse</Paragraph>
      <br />
      <Paragraph style={{ display: 'block', marginBottom: '2rem' }}>Lorem ipse</Paragraph>
      <br />
      <Paragraph style={{ display: 'block', marginBottom: '2rem' }}>Dolor, dollor 💵</Paragraph>
      <br />
      <Paragraph id="emojiParagraph" style={{ display: 'block', marginBottom: '2rem' }}>
        👍 👋 🏈 🎉 😂 ✅ 🤷‍♀️ 🤪
      </Paragraph>
      <br />
      <Paragraph style={{ display: 'block', marginBottom: '2rem' }}>Lorem ipse</Paragraph>
      <br />
      <a href="/iframe.html?id=blur-effect-view--default">OPEN IN FULL WINDOW MODE TO TEST SCROLL</a>
      <br />
      <Paragraph style={{ display: 'block', marginBottom: '2rem' }}>Lorem ipse</Paragraph>
      <br />
      <Paragraph style={{ display: 'block', marginBottom: '2rem' }}>Lorem ipse</Paragraph>
      <br />
      <Paragraph style={{ display: 'block', marginBottom: '2rem' }}>Lorem ipse</Paragraph>
      <br />
      <Paragraph style={{ display: 'block', marginBottom: '2rem' }}>Lorem ipse</Paragraph>
      <br />
      <Paragraph style={{ display: 'block', marginBottom: '2rem' }}>Lorem ipse</Paragraph>
      <br />
      <Paragraph style={{ display: 'block', marginBottom: '2rem' }}>Lorem ipse</Paragraph>
      <br />
      <Paragraph style={{ display: 'block', marginBottom: '2rem' }}>Lorem ipse</Paragraph>
      <br />
      <a href="/iframe.html?id=blur-effect-view--default">OPEN IN FULL WINDOW MODE TO TEST SCROLL</a>
      <br />
      <Paragraph style={{ display: 'block', marginBottom: '2rem' }}>Lorem ipse</Paragraph>
      <br />
      <Paragraph style={{ display: 'block', marginBottom: '2rem' }}>Lorem ipse</Paragraph>
      <br />
      <Paragraph style={{ display: 'block', marginBottom: '2rem' }}>Lorem ipse</Paragraph>
      <br />
      <Paragraph style={{ display: 'block', marginBottom: '2rem' }}>Lorem ipse</Paragraph>
      <br />
      <Paragraph style={{ display: 'block', marginBottom: '2rem' }}>Lorem ipse</Paragraph>
      <br />
      <Paragraph style={{ display: 'block', marginBottom: '2rem' }}>Lorem ipse</Paragraph>
      <br />
      <a href="/iframe.html?id=blur-effect-view--default">OPEN IN FULL WINDOW MODE TO TEST SCROLL</a>
      <br />
      <Paragraph style={{ display: 'block', marginBottom: '2rem' }}>Lorem ipse</Paragraph>
    </div>
  </>
));
