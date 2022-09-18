import React from 'react';

import CommonLayout from 'components/common/CommonLayout';
import Teapot from 'containers/common/Teapot';

const Page = props => {
  return (
    <CommonLayout>
      <Teapot {...props} />
    </CommonLayout>
  );
};

Page.getInitialProps = async ({ res }) => {
  if (res) {
    res.status(418);
  }
  return {};
};

Page.propTypes = {};

export default Page;
