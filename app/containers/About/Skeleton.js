import React, { Fragment } from 'react';
import { cssModules } from 'bpk-react-utils';

import { CardSkeleton, SectionSkeleton } from 'gg-components/dist/Skeletons';
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
      <SectionSkeleton />
      <CardSkeleton style={{ height: '13rem' }} />
      <CardSkeleton style={{ height: '30rem' }} />
      <CardSkeleton style={{ height: '5.6rem' }} />
    </div>
  );
};

export default AccountSkeleton;
