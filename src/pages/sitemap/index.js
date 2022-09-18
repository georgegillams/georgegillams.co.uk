import React from 'react';

import SiteMap from 'containers/SiteMap';
import blogPage from '../blog/';
import CommonLayout from 'components/common/CommonLayout';

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
