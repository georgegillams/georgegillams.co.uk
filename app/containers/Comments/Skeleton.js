import React, { Fragment } from 'react';
import { cssModules } from 'gg-components/helpers/cssModules';

import CommentsListSkeleton from './CommentsListSkeleton';

import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES);

const Skeleton = props => {
  const { className } = props;

  const outerClassNameFinal = [];

  if (className) {
    outerClassNameFinal.push(className);
  }

  return (
    <div className={outerClassNameFinal.join(' ')}>
      <CommentsListSkeleton />
    </div>
  );
};

export default Skeleton;
