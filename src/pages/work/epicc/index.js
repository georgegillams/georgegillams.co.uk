import React from 'react';

import WorkEPICC from 'containers/Work/EPICC';
import CommonLayout from 'components/common/CommonLayout';

const Page = props => {
  return (
    <CommonLayout>
      <WorkEPICC {...props} />
    </CommonLayout>
  );
};

Page.propTypes = {};

export default Page;
