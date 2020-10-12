import React from 'react';

import Photography from 'containers/Photography';
import CommonLayout, { LAYOUT_STYLES } from 'components/common/CommonLayout';

const Page = props => {
  return (
    <CommonLayout layout={LAYOUT_STYLES.defaultCenter} bottomPadding={false}>
      <Photography {...props} />
    </CommonLayout>
  );
};

Page.propTypes = {};

export default Page;
