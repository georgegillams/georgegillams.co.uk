import React from 'react';
import { storiesOf } from '@storybook/react';

import { PageTitle } from './index';

storiesOf('Page title', module)
  .add('Title', () => (
    <PageTitle name="Test">
      <div style={{ width: '45rem', height: '15rem', backgroundColor: 'red' }} />
    </PageTitle>
  ))
  .add('With link', () => (
    <PageTitle link={{ to: '/test', text: 'Back' }} name="Test">
      <div style={{ width: '45rem', height: '15rem', backgroundColor: 'red' }} />
    </PageTitle>
  ))
  .add('With custom link component', () => (
    <PageTitle
      renderLink={(href, name, className) => (
        <div style={{ padding: '1rem 0', background: 'lightgreen' }} className={className}>
          <a href={href}>{name}</a>
        </div>
      )}
      link={{ to: '/test', text: 'Back' }}
      name="Test">
      <div style={{ width: '45rem', height: '15rem', backgroundColor: 'red' }} />
    </PageTitle>
  ))
  .add('Title with custom headingProps', () => (
    <PageTitle headingProps={{ id: 'test-this' }} name="Test">
      <div style={{ width: '45rem', height: '15rem', backgroundColor: 'red' }} />
    </PageTitle>
  ))
  .add('With link and custom linkProps', () => (
    <PageTitle linkProps={{ id: 'test-this' }} link={{ to: '/test', text: 'Back' }} name="Test">
      <div style={{ width: '45rem', height: '15rem', backgroundColor: 'red' }} />
    </PageTitle>
  ));
