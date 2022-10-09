import React from 'react';

import CommonLayout from 'components/common/CommonLayout';
import WorkSideProjects from 'containers/Work/SideProjects';

const Page = props => {
  return (
    <CommonLayout>
      <WorkSideProjects {...props} />
    </CommonLayout>
  );
};

Page.propTypes = {};

export default Page;
