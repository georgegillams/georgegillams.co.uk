import React from 'react';

import WorkSideProjects from 'containers/Work/SideProjects';
import CommonLayout, { LAYOUT_STYLES } from 'components/common/CommonLayout';

const Page = props => {
  return (
    <CommonLayout layout={LAYOUT_STYLES.prose}>
      <WorkSideProjects {...props} />
    </CommonLayout>
  );
};

Page.propTypes = {};

export default Page;
