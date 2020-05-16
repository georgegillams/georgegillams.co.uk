import React, { Fragment } from 'react';
import { cssModules } from 'gg-components/helpers/cssModules';

import { SectionSkeleton, CardSkeleton } from 'gg-components/Skeletons';
import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES);

const AccountSkeleton = props => {
  const { className, ...rest } = props; // eslint-disable-line no-shadow

  const outerClassNameFinal = [getClassName('pages__container--prose')];

  if (className) {
    outerClassNameFinal.push(className);
  }

  return (
    <div className={outerClassNameFinal.join(' ')}>
      <SectionSkeleton style={{ width: '15rem' }} />
      <CardSkeleton style={{ height: '50rem' }} />
    </div>
  );
};

export default AccountSkeleton;
