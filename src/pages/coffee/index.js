import React from 'react';

import Medals from 'containers/Medals';
import CommonLayout from 'components/common/CommonLayout';

const Page = props => {
  return (
    <CommonLayout>
      <Medals {...props} />
    </CommonLayout>
  );
};

Page.propTypes = {};

export default Page;
