import React from 'react';

import CSSHack from 'components/common/CSSHack';
import ApiDocs from 'containers/common/ApiDocs';
import CommonLayout from 'components/common/CommonLayout';

const Page = props => {
  return (
    <CommonLayout>
      <CSSHack pageName="api-docs" />
      <ApiDocs {...props} />
    </CommonLayout>
  );
};

Page.propTypes = {};

export default Page;
