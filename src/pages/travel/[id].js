import React from 'react';

import CSSHack from 'components/common/CSSHack';
import BlogRenderer from 'containers/BlogRenderer';
import CommonLayout, { LAYOUT_STYLES } from 'components/common/CommonLayout';
import blogPage from '../blog/[id]';

const Page = props => {
  return (
    <CommonLayout layout={LAYOUT_STYLES.proseCenter} bottomPadding={false}>
      <CSSHack pageName="travel/[id]" />
      <BlogRenderer blogSubcategory="Travel" linkPrefix={'/travel'} {...props} />
    </CommonLayout>
  );
};

Page.getInitialProps = blogPage.getInitialProps;

Page.propTypes = {};

export default Page;
