import React from 'react';

import CSSHack from 'components/common/CSSHack';
import BlogCreate from 'containers/BlogCreate';
import CommonLayout from 'components/common/CommonLayout';

const Page = props => {
  return (
    <CommonLayout>
      <CSSHack pageName="create-blog" />
      <BlogCreate linkPrefix={'/blog'} {...props} />
    </CommonLayout>
  );
};

Page.propTypes = {};

export default Page;
