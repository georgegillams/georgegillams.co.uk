import React from 'react';

import Contact from 'containers/Contact';
import CommonLayout from 'components/common/CommonLayout';

const Page = props => {
  return (
    <CommonLayout>
      <Contact {...props} />
    </CommonLayout>
  );
};

Page.propTypes = {};

export default Page;
