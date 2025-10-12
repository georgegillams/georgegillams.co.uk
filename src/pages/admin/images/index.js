import React from 'react';

import Images from 'containers/common/Admin/Images';
import FlexLayout from 'components/common/FlexLayout';

const Page = props => {
  return (
    <FlexLayout>
      <Images {...props} />
    </FlexLayout>
  );
};

Page.propTypes = {};

export default Page;
