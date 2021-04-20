import React from 'react';

import CSSHack from 'components/common/CSSHack';
import Photography from 'containers/Photography';
import LegacyCommonLayout, { LAYOUT_STYLES } from 'components/common/LegacyCommonLayout';

const Page = props => {
  return (
    <LegacyCommonLayout layout={LAYOUT_STYLES.defaultCenter} bottomPadding={false}>
      <CSSHack pageName="photography" />
      <Photography {...props} />
    </LegacyCommonLayout>
  );
};

Page.propTypes = {};

export default Page;
