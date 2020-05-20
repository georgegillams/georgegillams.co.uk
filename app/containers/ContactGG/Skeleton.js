import React, { Fragment } from 'react';
import { cssModules } from 'gg-components/helpers/cssModules';

import {
  InfoCellSkeleton,
  ButtonSkeleton,
  SectionSkeleton,
} from 'gg-components/Skeletons';
import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES);

const ContactSkeleton = props => {
  const { className } = props;

  const outerClassNameFinal = [getClassName('pages__container--centered')];

  if (className) {
    outerClassNameFinal.push(className);
  }

  return (
    <div className={outerClassNameFinal.join(' ')}>
      <SectionSkeleton style={{ marginTop: '3rem', width: '20rem' }} />
      <div style={{ width: '100vw' }}>
        <InfoCellSkeleton style={{ opacity: 0.5 }} />
        <InfoCellSkeleton />
        <InfoCellSkeleton style={{ opacity: 0.5 }} />
        <InfoCellSkeleton />
        <InfoCellSkeleton style={{ opacity: 0.5 }} />
        <InfoCellSkeleton />
      </div>
      <ButtonSkeleton />
      <ButtonSkeleton />
    </div>
  );
};

export default ContactSkeleton;
