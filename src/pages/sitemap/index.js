import React from 'react';

import CSSHack from 'components/common/CSSHack';
import SiteMap from 'containers/SiteMap';
import LegacyCommonLayout from 'components/common/LegacyCommonLayout';
import blogPage from '../blog/';

const Page = props => {
  return (
    <LegacyCommonLayout>
      <CSSHack pageName="sitemap" />
      <SiteMap {...props} />
    </LegacyCommonLayout>
  );
};

Page.getInitialProps = blogPage.getInitialProps;

Page.propTypes = {};

export default Page;
