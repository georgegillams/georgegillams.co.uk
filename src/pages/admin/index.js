import React from 'react';

import Admin from 'containers/Admin/Navigation';
import CommonLayout from 'components/common/CommonLayout';

const Page = props => {
  return (
    <CommonLayout>
      <Admin {...props} />
    </CommonLayout>
  );
};

Page.propTypes = {};

export default Page;
