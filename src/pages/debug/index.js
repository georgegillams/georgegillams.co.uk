import React from 'react';

import CSSHack from 'components/common/CSSHack';
import Debug from 'containers/common/Debug';
import CommonLayout from 'components/common/CommonLayout';

const Page = props => {
  return (
    <CommonLayout>
      <CSSHack pageName="debug" />
      <Debug {...props} />
    </CommonLayout>
  );
};

Page.propTypes = {};

export default Page;
