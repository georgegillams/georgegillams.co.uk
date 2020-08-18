import React from 'react';

import SiteMap from 'containers/SiteMap';
import CommonLayout from 'components/common/CommonLayout';

const Page = props => {
  return (
    <CommonLayout>
      <SiteMap {...props} />
    </CommonLayout>
  );
};

Page.propTypes = {};

export default Page;
