import React from 'react';
import PropTypes from 'prop-types';
import Skeleton, { SKELETON_STYLES } from '@george-gillams/components/skeleton';

const PageSkeleton = props => {
  const { className } = props;

  const outerClassNames = [];

  if (className) {
    outerClassNames.push(className);
  }

  return (
    <div className={outerClassNames.join(' ')}>
      <Skeleton skeletonStyle={SKELETON_STYLES.section} />
      <Skeleton skeletonStyle={SKELETON_STYLES.cardCompact} style={{ marginTop: '1.2rem' }} />
      <Skeleton skeletonStyle={SKELETON_STYLES.cardCompact} style={{ marginTop: '1.2rem' }} />
      <Skeleton skeletonStyle={SKELETON_STYLES.cardCompact} style={{ marginTop: '1.2rem' }} />
      <Skeleton skeletonStyle={SKELETON_STYLES.cardCompact} style={{ marginTop: '1.2rem' }} />
    </div>
  );
};

PageSkeleton.propTypes = {
  className: PropTypes.string,
};

PageSkeleton.defaultProps = {
  className: null,
};

export default PageSkeleton;
