import React from 'react';

import CSSHack from 'components/common/CSSHack';
import Admin from 'containers/Admin/Navigation';
import CommonLayout from 'components/common/CommonLayout';

const Page = props => {
  return (
    <CommonLayout>
      <CSSHack pageName="admin" />
      <Admin {...props} />
    </CommonLayout>
  );
};

Page.propTypes = {};

export default Page;
