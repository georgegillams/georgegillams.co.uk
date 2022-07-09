import React from 'react';
import PropTypes from 'prop-types';
import Skeleton, { SKELETON_STYLES } from '@george-gillams/components/skeleton';
import STYLES from './admin-navigation.scss';
import { cssModules } from '@george-gillams/components/helpers/cssModules';

const getClassName = cssModules(STYLES);

const PageSkeleton = props => {
  const { className } = props;

  const outerClassNames = [];

  if (className) {
    outerClassNames.push(className);
  }

  return (
    <div className={outerClassNames.join(' ')}>
      <Skeleton skeletonStyle={SKELETON_STYLES.section} />
      <div className={getClassName('admin-navigation__card-container')}>
        <Skeleton skeletonStyle={SKELETON_STYLES.cardCompact} />
        <Skeleton skeletonStyle={SKELETON_STYLES.cardCompact} />
        <Skeleton skeletonStyle={SKELETON_STYLES.cardCompact} />
      </div>
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
