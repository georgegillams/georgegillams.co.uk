import React from 'react';

import Notifications from 'containers/common/Admin/Notifications';
import CommonLayout from 'components/common/CommonLayout';

const Page = props => {
  return (
    <CommonLayout>
      <Notifications {...props} />
    </CommonLayout>
  );
};

Page.propTypes = {};

export default Page;
