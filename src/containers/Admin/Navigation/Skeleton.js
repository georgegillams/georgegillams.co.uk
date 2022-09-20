import React from 'react';
import PropTypes from 'prop-types';
import Skeleton, { SKELETON_STYLES } from '@george-gillams/components/skeleton';
import { CardContainer } from './admin-navigation.styles';

const PageSkeleton = props => {
  return (
    <div {...props}>
      <Skeleton skeletonStyle={SKELETON_STYLES.section} />
      <CardContainer>
        <Skeleton skeletonStyle={SKELETON_STYLES.cardCompact} />
        <Skeleton skeletonStyle={SKELETON_STYLES.cardCompact} />
        <Skeleton skeletonStyle={SKELETON_STYLES.cardCompact} />
      </CardContainer>
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
