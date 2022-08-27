import React from 'react';

import WorkDegree from 'containers/Work/Degree';
import CommonLayout from 'components/common/CommonLayout';

const Page = props => {
  return (
    <CommonLayout>
      <WorkDegree {...props} />
    </CommonLayout>
  );
};

Page.propTypes = {};

export default Page;
