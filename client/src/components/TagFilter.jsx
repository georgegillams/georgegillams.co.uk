import React from 'react';
import Tag, { TAG_TYPES } from './Tag';

import STYLES from './tag-filter.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const Articles = () => (
  <div>{Object.keys(TAG_TYPES).map(v => <Tag type={v} link />)}</div>
);

export default Articles;
