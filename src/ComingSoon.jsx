import React from 'react';
import BpkText from 'bpk-component-text';

import STYLES from './app.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const ComingSoon = () => (
  <div className={getClassName('app__container')} >
    <BpkText tagName="h2" textStyle="xxl" className={getClassName('app__big-picture-text')}>
      Site Coming Soon...
    </BpkText>
  </div>
);

export default ComingSoon;
