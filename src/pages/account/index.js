import React from 'react';

import CSSHack from 'components/common/CSSHack';
import Account from 'containers/common/Account';
import CommonLayout from 'components/common/CommonLayout';

const Page = props => {
  return (
    <CommonLayout>
      <CSSHack pageName="account" />
      <Account {...props} />
    </CommonLayout>
  );
};

Page.propTypes = {};

export default Page;
