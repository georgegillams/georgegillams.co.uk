import React from 'react';

import WorkEPICC from 'containers/Work/EPICC';
import CommonLayout, { LAYOUT_STYLES } from 'components/common/CommonLayout';

const Page = props => {
  return (
    <CommonLayout layout={LAYOUT_STYLES.prose}>
      <WorkEPICC {...props} />
    </CommonLayout>
  );
};

Page.propTypes = {};

export default Page;
