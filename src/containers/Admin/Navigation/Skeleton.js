import React from 'react';
import PropTypes from 'prop-types';
import CompactCardSkeleton from 'ggComponents/Skeletons/CompactCardSkeleton';
import SectionSkeleton from 'ggComponents/Skeletons/SectionSkeleton';
import STYLES from './admin-navigation.module.scss';
import { cssModules } from 'ggComponents/helpers/cssModules';

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
