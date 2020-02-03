import React, { Fragment } from 'react';
import { cssModules } from 'bpk-react-utils';

import AboutSkeleton from 'containers/About/Skeleton';
import {
  CompactCardSkeleton,
  SectionSkeleton,
} from 'gg-components/dist/Skeletons';
import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES);

const AccountSkeleton = props => {
  const { className, ...rest } = props; // eslint-disable-line no-shadow

  const outerClassNameFinal = [];

  if (className) {
    outerClassNameFinal.push(className);
  }

  return (
    <div className={outerClassNameFinal.join(' ')} {...rest}>
      <AboutSkeleton />
      <SectionSkeleton />
      <div className={getClassName('pages__compact-card-container')}>
        <CompactCardSkeleton />
        <CompactCardSkeleton />
        <CompactCardSkeleton />
        <CompactCardSkeleton />
        <CompactCardSkeleton />
        <CompactCardSkeleton />
        <CompactCardSkeleton />
      </div>
    </div>
  );
};

export default AccountSkeleton;
