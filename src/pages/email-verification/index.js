import React from 'react';

import CSSHack from 'components/common/CSSHack';
import EmailVerification from 'containers/common/EmailVerification';
import CommonLayout from 'components/common/CommonLayout';

const Page = props => {
  return (
    <CommonLayout>
      <CSSHack pageName="email-verification" />
      <EmailVerification {...props} />
    </CommonLayout>
  );
};

Page.propTypes = {};

export default Page;
