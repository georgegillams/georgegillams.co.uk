import React, { Fragment } from 'react';

import {
  SectionSkeleton,
  InputSkeleton,
  ButtonSkeleton,
} from 'gg-components/dist/Skeletons';

const LoginFormSkeleton = props => (
  <Fragment>
    <SectionSkeleton />
    <InputSkeleton />
    <InputSkeleton />
    <InputSkeleton />
    <InputSkeleton />
    <ButtonSkeleton />
  </Fragment>
);

export default LoginFormSkeleton;
