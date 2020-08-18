import React from 'react';

import WorkOverview from 'containers/Work/Overview';
import CommonLayout, { LAYOUT_STYLES } from 'components/common/CommonLayout';

const Page = props => {
  return (
    <CommonLayout layout={LAYOUT_STYLES.prose}>
      <WorkOverview {...props} />
    </CommonLayout>
  );
};

Page.propTypes = {};

export default Page;
