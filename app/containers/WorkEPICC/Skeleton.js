import React, { Fragment } from 'react';
import { cssModules } from 'bpk-react-utils';

import {
  SmallButtonSkeleton,
  SubSectionSkeleton,
  CardSkeleton,
  SectionSkeleton,
} from 'gg-components/Skeletons';
import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES);

const LoginFormSkeleton = props => {
  const { className, ...rest } = props; // eslint-disable-line no-shadow

  const outerClassNameFinal = [getClassName('pages__container--prose')];

  if (className) {
    outerClassNameFinal.push(className);
  }

  return (
    <div className={outerClassNameFinal.join(' ')} {...rest}>
      <SectionSkeleton style={{ marginTop: '3rem' }} />
      <SubSectionSkeleton />
      <SmallButtonSkeleton />
      <CardSkeleton />
    </div>
  );
};

export default LoginFormSkeleton;