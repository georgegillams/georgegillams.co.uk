import React from 'react';
import PropTypes from 'prop-types';
import CompactCardSkeleton from '@george-gillams/components/Skeletons/CompactCardSkeleton';
import SectionSkeleton from '@george-gillams/components/Skeletons/SectionSkeleton';
import STYLES from './admin-navigation.scss';
import { cssModules } from '@george-gillams/components/helpers/cssModules';

const getClassName = cssModules(STYLES);

const Skeleton = props => {
  const { className } = props;

  const outerClassNames = [];

  if (className) {
    outerClassNames.push(className);
  }

  return (
    <div className={outerClassNames.join(' ')}>
      <SectionSkeleton />
      <div className={getClassName('admin-navigation__card-container')}>
        <CompactCardSkeleton />
        <CompactCardSkeleton />
        <CompactCardSkeleton />
      </div>
    </div>
  );
};

Skeleton.propTypes = {
  className: PropTypes.string,
};

Skeleton.defaultProps = {
  className: null,
};

export default Skeleton;
