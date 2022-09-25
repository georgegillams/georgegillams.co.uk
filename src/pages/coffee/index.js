import React from 'react';

import Coffee from 'containers/Coffee';
import CommonLayout from 'components/common/CommonLayout';

const Page = props => {
  return (
    <CommonLayout>
      <Coffee {...props} />
    </CommonLayout>
  );
};

Page.propTypes = {};

export default Page;
