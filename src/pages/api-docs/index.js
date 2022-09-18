import React from 'react';

import ApiDocs from 'containers/common/ApiDocs';
import CommonLayout from 'components/common/CommonLayout';

const Page = props => {
  return (
    <CommonLayout>
      <ApiDocs {...props} />
    </CommonLayout>
  );
};

Page.propTypes = {};

export default Page;
