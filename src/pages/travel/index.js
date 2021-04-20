import React from 'react';

import CSSHack from 'components/common/CSSHack';
import BlogList from 'containers/BlogList';
import LegacyCommonLayout from 'components/common/LegacyCommonLayout';
import blogPage from '../blog/';

const Page = props => {
  return (
    <LegacyCommonLayout bottomPadding={false}>
      <CSSHack pageName="travel" />
      <BlogList linkPrefix={'/travel'} selectedNav="Travel" filter={x => x.showInTravelBlogsList} {...props} />
    </LegacyCommonLayout>
  );
};

Page.getInitialProps = blogPage.getInitialProps;

Page.propTypes = {};

export default Page;
