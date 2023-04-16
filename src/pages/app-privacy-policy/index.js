import React from 'react';

import AppPrivacyPolicy from 'containers/AppPrivacyPolicy';
import CommonLayout from 'components/common/CommonLayout';

const Page = props => {
  return (
    <CommonLayout>
      <AppPrivacyPolicy {...props} />
    </CommonLayout>
  );
};

Page.propTypes = {};

export default Page;
