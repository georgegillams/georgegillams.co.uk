/* eslint-disable jsx-a11y/accessible-emoji */

import React from 'react';
import { storiesOf } from '@storybook/react';

import { Paragraph } from '../Paragraph';

import { NavigationBar, NavigationItem } from './index';

const menuItems = [
  <NavigationItem name="Test 1" />,
  <NavigationItem name="Test 2" />,
  <NavigationItem name="Test 3" />,
  <NavigationItem name="Test 4" />,
];

const accountMenuItem = <button type="button">account</button>;
const logo = <span style={{ color: 'hotpink' }}>LOGO</span>;

storiesOf('Navigation bar', module)
  .add('Default', () => <NavigationBar menuItems={menuItems} accountMenuItem={accountMenuItem} logo={logo} />)
  .add('With scroll', () => (
    <div>
      <NavigationBar menuItems={menuItems} accountMenuItem={accountMenuItem} logo={logo} />
      <div id="mainScrollView">
        <a href="/iframe.html?id=navigation-bar--with-scroll">OPEN IN FULL WINDOW MODE TO TEST SCROLL</a>
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
        <a href="/iframe.html?id=navigation-bar--with-scroll">OPEN IN FULL WINDOW MODE TO TEST SCROLL</a>
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
        <a href="/iframe.html?id=navigation-bar--with-scroll">OPEN IN FULL WINDOW MODE TO TEST SCROLL</a>
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
        <a href="/iframe.html?id=navigation-bar--with-scroll">OPEN IN FULL WINDOW MODE TO TEST SCROLL</a>
        <br />
        <Paragraph style={{ display: 'block', marginBottom: '2rem' }}>Lorem ipse</Paragraph>
      </div>
    </div>
  ));
