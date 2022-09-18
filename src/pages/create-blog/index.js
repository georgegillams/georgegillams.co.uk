import React from 'react';

import BlogCreate from 'containers/BlogCreate';
import CommonLayout from 'components/common/CommonLayout';

const Page = props => {
  return (
    <CommonLayout>
      <BlogCreate linkPrefix={'/blog'} {...props} />
    </CommonLayout>
  );
};

Page.propTypes = {};

export default Page;
