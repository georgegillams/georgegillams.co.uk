import React from 'react';

import CSSHack from 'components/common/CSSHack';
import Notifications from 'containers/common/Admin/Notifications';
import CommonLayout from 'components/common/CommonLayout';

const Page = props => {
  return (
    <CommonLayout>
      <CSSHack pageName="admin/notifications" />
      <Notifications {...props} />
    </CommonLayout>
  );
};

Page.propTypes = {};

export default Page;
