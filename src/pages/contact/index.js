import React from 'react';

import Contact from 'containers/Contact';
import CommonLayout, { LAYOUT_STYLES } from 'components/common/CommonLayout';

const Page = props => {
  return (
    <CommonLayout layout={LAYOUT_STYLES.fullWidthCenter}>
      <Contact {...props} />
    </CommonLayout>
  );
};

Page.propTypes = {};

export default Page;
