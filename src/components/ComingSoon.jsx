import React from 'react';
import BpkText from 'bpk-component-text';

import STYLES from './app.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const ComingSoon = () => (
  <BpkText tagName="h2" textStyle="xxl" className={getClassName('app__big-picture-text')}>
    Site Coming Soon...
  </BpkText>
);

export default ComingSoon;
