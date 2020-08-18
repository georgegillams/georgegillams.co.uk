import React from 'react';

import BlogRenderer from 'containers/BlogRenderer';
import CommonLayout, { LAYOUT_STYLES } from 'components/common/CommonLayout';

const Page = props => {
  return (
    <CommonLayout layout={LAYOUT_STYLES.prose}>
      <BlogRenderer blogSubcategory="Blog" linkPrefix={'/blog'} {...props} />
    </CommonLayout>
  );
};

// Wire this up post-launch
Page.getInitialProps = async context => {
  const blogId = context.query.id;
  const isServer = !!context.req;

  // On the client side, we'll just return nothing as we want to leave
  // loading the blog up to redux once the container has mounted
  if (!isServer) {
    return { blogId };
  }

  // TODO Load blog from API and pass to props.
  // TODO There is no need to worry about authentication, as any robots
  // that see the initial page will be unauthenticated
  console.log(`blogId`, blogId);
  return { blogId }; // will be passed to the page component as props
};

Page.propTypes = {};

export default Page;
