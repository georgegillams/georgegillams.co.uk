import React from 'react';

import BlogList from 'containers/BlogList';
import CommonLayout from 'components/common/CommonLayout';

const Page = props => {
  return (
    <CommonLayout>
      <BlogList linkPrefix={'/travel'} selectedNav="Travel" filter={x => x.showInTravelBlogsList} {...props} />
    </CommonLayout>
  );
};

Page.propTypes = {};

export default Page;
