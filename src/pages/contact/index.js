import React from 'react';

import CSSHack from 'components/common/CSSHack';
import Contact from 'containers/Contact';
import CommonLayout from 'components/common/CommonLayout';

const Page = props => {
  return (
    <CommonLayout>
      <CSSHack pageName="contact" />
      <Contact {...props} />
    </CommonLayout>
  );
};

Page.propTypes = {};

export default Page;
