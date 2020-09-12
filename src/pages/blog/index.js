import React from 'react';

import BlogList from 'containers/BlogList';
import CommonLayout from 'components/common/CommonLayout';
import apiStructure from 'helpers/common/apiStructure';

const Page = props => {
  return (
    <CommonLayout>
      <BlogList linkPrefix={'/blog'} selectedNav="Writing" filter={x => x.showInBlogsList} {...props} />
    </CommonLayout>
  );
};

Page.getInitialProps = async context => {
  const isServer = !!context.req;

  // On the client side, we'll just return nothing as we want to leave
  // loading the blog up to redux once the container has mounted
  if (!isServer) {
    return {};
  }

  // Load blogs from API and pass to props.
  const requestUrl = apiStructure.loadBlogs.fullPath;
  const ssrBlogs = await fetch(requestUrl)
    .then(data => data.json())
    .then(result => result.blogs);
  return { ssrBlogs }; // will be passed to the page component as props
};

Page.propTypes = {};

export default Page;
