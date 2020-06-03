import React from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'gg-components/helpers/cssModules';
import { CardSkeleton, SectionSkeleton } from 'gg-components/Skeletons';

import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES);

const Skeleton = props => {
  const { className } = props;

  const outerClassNameFinal = [getClassName('pages__container--centered')];

  if (className) {
    outerClassNameFinal.push(className);
  }

  return (
    <div className={outerClassNameFinal.join(' ')}>
      <SectionSkeleton style={{ marginTop: '3rem' }} />
      <CardSkeleton style={{ height: '13rem' }} />
      <CardSkeleton style={{ height: '30rem', maxWidth: '40rem' }} />
      <CardSkeleton style={{ height: '5.6rem' }} />
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
