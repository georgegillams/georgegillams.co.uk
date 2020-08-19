import React from 'react';
import { storiesOf } from '@storybook/react';

import { ArticleDate } from './index';

storiesOf('Article date', module).add('default', () => <ArticleDate date={new Date(2019, 4, 5, 10, 11, 12)} />);
