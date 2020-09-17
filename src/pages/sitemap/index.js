import React from 'react';

import SiteMap from 'containers/SiteMap';
import CommonLayout from 'components/common/CommonLayout';
import blogPage from '../blog/';

const Page = props => {
  return (
    <CommonLayout>
      <SiteMap {...props} />
    </CommonLayout>
  );
};

Page.getInitialProps = blogPage.getInitialProps;

Page.propTypes = {};

export default Page;
