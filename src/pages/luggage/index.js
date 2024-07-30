import React from 'react';

import Luggage from 'containers/Luggage';
import CommonLayout from 'components/common/CommonLayout';

const Page = props => {
  return (
    <CommonLayout>
      <Luggage {...props} />
    </CommonLayout>
  );
};

Page.propTypes = {};

export default Page;
