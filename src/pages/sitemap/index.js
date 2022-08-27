import React from 'react';

import CSSHack from 'components/common/CSSHack';
import SiteMap from 'containers/SiteMap';
import blogPage from '../blog/';
import CommonLayout from 'components/common/CommonLayout';

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
