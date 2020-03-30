import React, { Fragment } from 'react';
import { cssModules } from 'bpk-react-utils';
import { SmallButtonSkeleton } from 'gg-components/Skeletons';

import BlogListSkeleton from './BlogListSkeleton';

import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES);

const AccountSkeleton = props => {
  const { className, ...rest } = props; // eslint-disable-line no-shadow

  const outerClassNameFinal = [];

  if (className) {
    outerClassNameFinal.push(className);
  }

  return (
    <div className={outerClassNameFinal.join(' ')}>
      <SmallButtonSkeleton
        style={{ marginTop: '1rem', marginBottom: '1rem' }}
      />
      <BlogListSkeleton />
    </div>
  );
};

export default AccountSkeleton;
