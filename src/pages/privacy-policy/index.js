import React from 'react';

import CSSHack from 'components/common/CSSHack';
import PrivacyPolicy from 'containers/common/PrivacyPolicy';
import CommonLayout from 'components/common/CommonLayout';

const Page = props => {
  return (
    <CommonLayout>
      <PrivacyPolicy {...props} />
    </CommonLayout>
  );
};

Page.propTypes = {};

export default Page;
