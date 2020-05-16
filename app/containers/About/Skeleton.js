import React, { Fragment } from 'react';
import { cssModules } from 'gg-components/helpers/cssModules';

import { CardSkeleton, SectionSkeleton } from 'gg-components/Skeletons';
import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES);

const AccountSkeleton = props => {
  const { className, ...rest } = props; // eslint-disable-line no-shadow

  const outerClassNameFinal = [getClassName('pages__container--centered')];

  if (className) {
    outerClassNameFinal.push(className);
  }

  return (
    <div className={outerClassNameFinal.join(' ')} {...rest}>
      <SectionSkeleton style={{ marginTop: '3rem' }} />
      <CardSkeleton style={{ height: '13rem' }} />
      <CardSkeleton style={{ height: '30rem', maxWidth: '40rem' }} />
      <CardSkeleton style={{ height: '5.6rem' }} />
    </div>
  );
};

export default AccountSkeleton;
