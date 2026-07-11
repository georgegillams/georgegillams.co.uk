import React from 'react';

import WorkProjects from 'containers/Work/Projects';
import CommonLayout from 'components/common/CommonLayout';

const Page = props => {
  return (
    <CommonLayout>
      <WorkProjects {...props} />
    </CommonLayout>
  );
};

Page.propTypes = {};

export default Page;
