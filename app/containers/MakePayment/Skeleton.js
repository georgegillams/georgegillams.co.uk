import React, { Fragment } from 'react';
import { cssModules } from 'gg-components/helpers/cssModules';

import AboutSkeleton from 'containers/About/Skeleton';
import {
  InputSkeleton,
  SectionSkeleton,
  ButtonSkeleton,
} from 'gg-components/Skeletons';
import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES);

const MakePaymentSkeleton = props => {
  const { ...rest } = props;

  return (
    <div {...rest}>
      <SectionSkeleton style={{ marginTop: '3rem' }} />
      <InputSkeleton style={{ marginTop: '2rem' }} />
      <InputSkeleton style={{ marginTop: '2rem' }} />
      <InputSkeleton style={{ marginTop: '2rem' }} />
      <ButtonSkeleton />
    </div>
  );
};

export default MakePaymentSkeleton;
