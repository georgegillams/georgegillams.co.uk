import React from 'react';
import PropTypes from 'prop-types';
import { SectionSkeleton, ButtonSkeleton } from '@george-gillams/components/Skeletons';

const Skeleton = props => {
  const { className } = props;

  const outerClassNames = [];

  if (className) {
    outerClassNames.push(className);
  }

  return (
    <div className={outerClassNames.join(' ')}>
      <SectionSkeleton />
      <ButtonSkeleton style={{ marginTop: '1.2rem' }} />
      <ButtonSkeleton />
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
