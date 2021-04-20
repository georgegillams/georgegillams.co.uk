import React from 'react';

import WorkOverview from 'containers/Work/Overview';
import LegacyCommonLayout, { LAYOUT_STYLES } from 'components/common/LegacyCommonLayout';

const Page = props => {
  return (
    <LegacyCommonLayout layout={LAYOUT_STYLES.prose}>
      <WorkOverview {...props} />
    </LegacyCommonLayout>
  );
};

Page.propTypes = {};

export default Page;
