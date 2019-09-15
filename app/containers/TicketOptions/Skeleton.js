import React, { Fragment } from 'react';

import { CompactCardSkeleton, SectionSkeleton } from 'gg-components/dist/Skeletons';

const Skeleton = props => {
  const { className, ...rest } = props; // eslint-disable-line no-shadow

  const outerClassNameFinal = [getClassName('pages__container')];

  if (className) {
    outerClassNameFinal.push(className);
  }

  return (
    <div className={getClassName('pages__compact-card-container')}>
      <CompactCardSkeleton />
      <CompactCardSkeleton />
      <CompactCardSkeleton />
      <CompactCardSkeleton />
    </div>
  );
};

export default Skeleton;
