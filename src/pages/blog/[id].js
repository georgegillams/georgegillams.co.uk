import React from 'react';

import BlogRenderer from 'containers/BlogRenderer';
import CommonLayout, { LAYOUT_STYLES } from 'components/common/CommonLayout';
import apiStructure from 'helpers/common/apiStructure';

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

  // Load blog from API and pass to props.
  const requestUrl = apiStructure.loadBlog.fullPath.split(':id').join(blogId);
  const ssrBlog = await fetch(requestUrl).then(data => data.json());
  return { ssrBlog, blogId }; // will be passed to the page component as props
};

Page.propTypes = {};

export default Page;
