import React from 'react';

import WorkQualifications from 'containers/Work/Qualifications';
import CommonLayout from 'components/common/CommonLayout';

const Page = props => {
  return (
    <CommonLayout>
      <WorkQualifications {...props} />
    </CommonLayout>
  );
};

Page.propTypes = {};

export default Page;
