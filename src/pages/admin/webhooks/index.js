import React from 'react';

import Webhooks from 'containers/common/Admin/Webhooks';
import CommonLayout from 'components/common/CommonLayout';

const Page = props => {
  return (
    <CommonLayout>
      <Webhooks {...props} />
    </CommonLayout>
  );
};

Page.propTypes = {};

export default Page;
