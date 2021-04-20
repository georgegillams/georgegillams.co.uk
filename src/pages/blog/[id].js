import React from 'react';
import PropTypes from 'prop-types';

import CSSHack from 'components/common/CSSHack';
import BlogRenderer from 'containers/BlogRenderer';
import LegacyCommonLayout, { LAYOUT_STYLES } from 'components/common/LegacyCommonLayout';
import apiStructure from 'helpers/common/apiStructure';
import FourOhFourPage from '../404';
import { SESSION_COOKIE_KEY } from 'helpers/storageConstants';

const Page = props => {
  const { is404, ...rest } = props;
  if (is404) {
    return <FourOhFourPage {...rest} />;
  }

  return (
    <LegacyCommonLayout layout={LAYOUT_STYLES.prose} bottomPadding={false}>
      <CSSHack pageName="blog/[id]" />
      <BlogRenderer blogSubcategory="Blog" linkPrefix={'/blog'} {...rest} />
    </LegacyCommonLayout>
  );
};

Page.propTypes = {
  is404: PropTypes.bool,
};

Page.defaultProps = {
  is404: false,
};

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

  let sessionCookie = '';
  if (isServer && context && context.req && context.req.cookies && context.req.cookies[SESSION_COOKIE_KEY]) {
    sessionCookie = context.req.cookies[SESSION_COOKIE_KEY];
  }

  const ssrBlog = await fetch(requestUrl, {
    credentials: 'include',
    headers: { Cookie: `${SESSION_COOKIE_KEY}=${sessionCookie}` },
  }).then(data => data.json());
  if (!ssrBlog.error) {
    return { ssrBlog, blogId }; // will be passed to the page component as props
  }

  // If the blog does not exist, set 404 status and render 404 page
  if (context.res) {
    context.res.status(404);
  }
  return { is404: true, blogId };
};

Page.propTypes = {};

export default Page;
