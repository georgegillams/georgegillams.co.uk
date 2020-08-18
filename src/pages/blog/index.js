import React from 'react';

import BlogList from 'containers/BlogList';
import CommonLayout from 'components/common/CommonLayout';

const Page = props => {
  return (
    <CommonLayout>
      <BlogList linkPrefix={'/blog'} selectedNav="Writing" filter={x => x.showInBlogsList} {...props} />
    </CommonLayout>
  );
};

Page.propTypes = {};

export default Page;
