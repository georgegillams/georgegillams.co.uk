import React, { Fragment } from 'react';
import { cssModules } from 'bpk-react-utils';

import AboutSkeleton from 'containers/About/Skeleton';
import {
  InputSkeleton,
  SectionSkeleton,
  ButtonSkeleton,
} from 'gg-components/Skeletons';
import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES);

const PaymentsSkeleton = props => {
  const { ...rest } = props;

  return (
    <div {...rest}>
      <SectionSkeleton style={{ marginTop: '3rem' }} />
      <InputSkeleton style={{ marginTop: '3.4rem' }} />
      <InputSkeleton style={{ marginTop: '2.4rem' }} />
      <ButtonSkeleton style={{ marginTop: '3rem' }} />
    </div>
  );
};

export default PaymentsSkeleton;