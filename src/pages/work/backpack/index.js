import React from 'react';

import WorkBackpack from 'containers/Work/Backpack';
import CommonLayout from 'components/common/CommonLayout';

const Page = props => {
  return (
    <CommonLayout>
      <WorkBackpack {...props} />
    </CommonLayout>
  );
};

Page.propTypes = {};

export default Page;
