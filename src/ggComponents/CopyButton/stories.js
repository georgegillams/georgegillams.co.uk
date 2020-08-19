/* eslint-disable react/prop-types */
import React from 'react';
import { storiesOf } from '@storybook/react';

import { CopyButton } from './index';

storiesOf('Copy button', module).add('Default', () => <CopyButton text="This was a JS copy test." />);
