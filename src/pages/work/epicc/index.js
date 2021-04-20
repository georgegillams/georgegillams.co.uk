import React from 'react';

import WorkEPICC from 'containers/Work/EPICC';
import LegacyCommonLayout, { LAYOUT_STYLES } from 'components/common/LegacyCommonLayout';

const Page = props => {
  return (
    <LegacyCommonLayout layout={LAYOUT_STYLES.prose}>
      <WorkEPICC {...props} />
    </LegacyCommonLayout>
  );
};

Page.propTypes = {};

export default Page;
