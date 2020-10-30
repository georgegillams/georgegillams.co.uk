import React from 'react';

import CSSHack from 'components/common/CSSHack';
import Contact from 'containers/Contact';
import CommonLayout, { LAYOUT_STYLES } from 'components/common/CommonLayout';

const Page = props => {
  return (
    <CommonLayout layout={LAYOUT_STYLES.fullWidthCenter}>
      <CSSHack pageName="contact" />
      <Contact {...props} />
    </CommonLayout>
  );
};

Page.propTypes = {};

export default Page;
