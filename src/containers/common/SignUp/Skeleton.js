import React from 'react';
import PropTypes from 'prop-types';
import { SectionSkeleton, InputSkeleton, ButtonSkeleton } from 'gg-components/Skeletons';

const Skeleton = props => {
  const { className } = props;

  const outerClassNames = [];

  if (className) {
    outerClassNames.push(className);
  }

  return (
    <div className={outerClassNames.join(' ')}>
      <SectionSkeleton />
      <InputSkeleton />
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
