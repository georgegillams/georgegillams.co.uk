import React from 'react';

import CSSHack from 'components/common/CSSHack';
import Photography from 'containers/Photography';
import CommonLayout, { LAYOUT_STYLES } from 'components/common/CommonLayout';

const Page = props => {
  return (
    <CommonLayout layout={LAYOUT_STYLES.defaultCenter} bottomPadding={false}>
      <CSSHack pageName="photography" />
      <Photography {...props} />
    </CommonLayout>
  );
};

Page.propTypes = {};

export default Page;
