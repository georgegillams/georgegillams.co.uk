import React from 'react';

import Analytics from 'containers/common/Admin/Analytics';
import FlexLayout from 'components/common/FlexLayout';

const Page = props => {
  return (
    <FlexLayout>
      <Analytics {...props} />
    </FlexLayout>
  );
};

Page.propTypes = {};

export default Page;
