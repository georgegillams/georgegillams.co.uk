import React from 'react';

import CSSHack from 'components/common/CSSHack';
import SignUp from 'containers/common/SignUp';
import CommonLayout from 'components/common/CommonLayout';

const Page = props => {
  return (
    <CommonLayout>
      <CSSHack pageName="sign-up" />
      <SignUp {...props} />
    </CommonLayout>
  );
};

Page.propTypes = {};

export default Page;
