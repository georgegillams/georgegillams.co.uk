import React from 'react';

import Account from 'containers/common/Account';
import CommonLayout from 'components/common/CommonLayout';

const Page = props => {
  return (
    <CommonLayout>
      <Account {...props} />
    </CommonLayout>
  );
};

Page.propTypes = {};

export default Page;
