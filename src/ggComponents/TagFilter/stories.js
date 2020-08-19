import React from 'react';
import { storiesOf } from '@storybook/react';

import { TagFilter } from './index';

storiesOf('Tag filter', module).add('Default', () => <TagFilter selectedTags={[]} />);
