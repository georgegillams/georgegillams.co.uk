import React from 'react';

import CSSHack from 'components/common/CSSHack';
import Medals from 'containers/Medals';
import CommonLayout from 'components/common/CommonLayout';

const Page = props => {
  return (
    <CommonLayout>
      <CSSHack pageName="medals" />
      <Medals {...props} />
    </CommonLayout>
  );
};

Page.propTypes = {};

export default Page;
