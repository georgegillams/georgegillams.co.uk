import React from 'react';

import Drone from 'containers/Drone';
import CommonLayout from 'components/common/CommonLayout';

const Page = props => {
  return (
    <CommonLayout>
      <Drone {...props} />
    </CommonLayout>
  );
};

Page.propTypes = {};

export default Page;
