import React from 'react';

import WorkOverview from 'containers/Work/Overview';
import CommonLayout from 'components/common/CommonLayout';

const Page = props => {
  return (
    <CommonLayout>
      <WorkOverview {...props} />
    </CommonLayout>
  );
};

Page.propTypes = {};

export default Page;
