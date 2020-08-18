import React from 'react';

import Home from 'containers/HomePage';
import CommonLayout, { LAYOUT_STYLES } from 'components/common/CommonLayout';

const Page = props => {
  return (
    <CommonLayout layout={LAYOUT_STYLES.defaultCenter}>
      <Home {...props} />
    </CommonLayout>
  );
};

Page.propTypes = {};

export default Page;
