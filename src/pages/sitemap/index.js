import React from 'react';

import CSSHack from 'components/common/CSSHack';
import SiteMap from 'containers/SiteMap';
import CommonLayout from 'components/common/CommonLayout';
import blogPage from '../blog/';

const Page = props => {
  return (
    <CommonLayout>
      <CSSHack pageName="sitemap" />
      <SiteMap {...props} />
    </CommonLayout>
  );
};

Page.getInitialProps = blogPage.getInitialProps;

Page.propTypes = {};

export default Page;
