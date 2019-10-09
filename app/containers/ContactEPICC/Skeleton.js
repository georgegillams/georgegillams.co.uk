import React, { Fragment } from 'react';
import { cssModules } from 'bpk-react-utils';

import {
  SmallProgressSkeleton,
  SectionSkeleton,
  CompactCardSkeleton,
} from 'gg-components/dist/Skeletons';
import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES);

const AccountSkeleton = props => {
  const { className, ...rest } = props; // eslint-disable-line no-shadow

  const outerClassNameFinal = ['pages__container--centered'];

  if (className) {
    outerClassNameFinal.push(className);
  }

  return (
    <div className={outerClassNameFinal.join(' ')} {...rest}>
      <SectionSkeleton />
      <SmallProgressSkeleton />
    </div>
  );
};

export default AccountSkeleton;
