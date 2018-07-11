import React from 'react';
import { cssModules } from 'bpk-react-utils';

import STYLES from './redirect-notice.scss';

const getClassName = cssModules(STYLES);

const RedirectNotice = () => (
  <div className={getClassName('redirect-notice__text')}>
    REDIRECTING TO SECURE SITE
  </div>
);

export default RedirectNotice;
