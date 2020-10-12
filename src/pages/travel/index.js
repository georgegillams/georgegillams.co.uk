import React from 'react';

import BlogList from 'containers/BlogList';
import CommonLayout from 'components/common/CommonLayout';
import blogPage from '../blog/';

const Page = props => {
  return (
    <CommonLayout bottomPadding={false}>
      <BlogList linkPrefix={'/travel'} selectedNav="Travel" filter={x => x.showInTravelBlogsList} {...props} />
    </CommonLayout>
  );
};

Page.getInitialProps = blogPage.getInitialProps;

Page.propTypes = {};

export default Page;
