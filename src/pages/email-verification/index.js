import React from 'react';

import EmailVerification from 'containers/common/EmailVerification';
import CommonLayout from 'components/common/CommonLayout';

const Page = props => {
  return (
    <CommonLayout>
      <EmailVerification {...props} />
    </CommonLayout>
  );
};

Page.propTypes = {};

export default Page;
