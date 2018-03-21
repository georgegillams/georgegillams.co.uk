import React from 'react';

import STYLES from './redirect-notice.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const RedirectNotice = () => (
  <div className={getClassName('redirect-notice__text')}>
    REDIRECTING TO SECURE SITE
  </div>
);

export default RedirectNotice;
