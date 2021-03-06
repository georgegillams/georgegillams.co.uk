import React from 'react';

import CSSHack from 'components/common/CSSHack';
import Home from 'containers/HomePageV2';
import CommonLayout from 'components/common/CommonLayout';

const Page = props => {
  return (
    <CommonLayout>
      <CSSHack pageName="index" />
      <Home {...props} />
    </CommonLayout>
  );
};

Page.propTypes = {};

export default Page;
