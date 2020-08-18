import React from 'react';

import Support from 'containers/Support';
import CommonLayout from 'components/common/CommonLayout';

const Page = props => {
  return (
    <CommonLayout>
      <Support {...props} />
    </CommonLayout>
  );
};

Page.propTypes = {};

export default Page;
