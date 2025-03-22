import React from 'react';

import Webhooks from 'containers/common/Admin/Webhooks';
import FlexLayout from 'components/common/FlexLayout';

const Page = props => {
  return (
    <FlexLayout>
      <Webhooks {...props} />
    </FlexLayout>
  );
};

Page.propTypes = {};

export default Page;
