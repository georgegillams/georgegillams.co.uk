import React from 'react';

import Login from 'containers/common/Login';
import CommonLayout from 'components/common/CommonLayout';

const Page = props => {
  return (
    <CommonLayout>
      <Login {...props} />
    </CommonLayout>
  );
};

Page.propTypes = {};

export default Page;
