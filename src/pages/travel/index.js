import React from 'react';

import CSSHack from 'components/common/CSSHack';
import BlogList from 'containers/BlogList';
import CommonLayout from 'components/common/CommonLayout';
import blogPage from '../blog/';

const Page = props => {
  return (
    <CommonLayout bottomPadding={false}>
      <CSSHack pageName="travel" />
      <BlogList linkPrefix={'/travel'} selectedNav="Travel" filter={x => x.showInTravelBlogsList} {...props} />
    </CommonLayout>
  );
};

Page.getInitialProps = blogPage.getInitialProps;

Page.propTypes = {};

export default Page;
