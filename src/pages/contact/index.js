import React from 'react';

import CSSHack from 'components/common/CSSHack';
import Contact from 'containers/Contact';
import LegacyCommonLayout, { LAYOUT_STYLES } from 'components/common/LegacyCommonLayout';

const Page = props => {
  return (
    <LegacyCommonLayout layout={LAYOUT_STYLES.fullWidthCenter}>
      <CSSHack pageName="contact" />
      <Contact {...props} />
    </LegacyCommonLayout>
  );
};

Page.propTypes = {};

export default Page;
