import React from 'react';

import CSSHack from 'components/common/CSSHack';
import BlogCreate from 'containers/BlogCreate';
import LegacyCommonLayout from 'components/common/LegacyCommonLayout';

const Page = props => {
  return (
    <LegacyCommonLayout>
      <CSSHack pageName="create-blog" />
      <BlogCreate linkPrefix={'/blog'} {...props} />
    </LegacyCommonLayout>
  );
};

Page.propTypes = {};

export default Page;
