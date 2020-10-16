import React from 'react';

import CSSHack from 'components/common/CSSHack';
import MagicLogin from 'containers/common/MagicLogin';
import CommonLayout from 'components/common/CommonLayout';

const Page = props => {
  return (
    <CommonLayout>
      <CSSHack pageName="magic-login" />
      <MagicLogin {...props} />
    </CommonLayout>
  );
};

Page.propTypes = {};

export default Page;
