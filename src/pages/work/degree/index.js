import React from 'react';

import WorkDegree from 'containers/Work/Degree';
import LegacyCommonLayout, { LAYOUT_STYLES } from 'components/common/LegacyCommonLayout';

const Page = props => {
  return (
    <LegacyCommonLayout layout={LAYOUT_STYLES.prose}>
      <WorkDegree {...props} />
    </LegacyCommonLayout>
  );
};

Page.propTypes = {};

export default Page;
