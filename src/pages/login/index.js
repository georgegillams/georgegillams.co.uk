import React from 'react';

import CSSHack from 'components/common/CSSHack';
import Login from 'containers/common/Login';
import CommonLayout from 'components/common/CommonLayout';

const Page = props => {
  return (
    <CommonLayout>
      <Login {...props} />
    </CommonLayout>
  );
};

Page.propTypes = {};

export default Page;
