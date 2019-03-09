import React from 'react';

import './skeleton.scss';

const MS = props => (
  <div {...props}>
    <div className="skeleton__shimmer" />
  </div>
);

export default MS;
