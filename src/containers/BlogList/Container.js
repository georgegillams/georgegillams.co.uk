import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'gg-components/helpers/cssModules';
import DebugObject from 'components/common/DebugObject';
import { LoadingCover } from 'gg-components/LoadingCover';

import BlogListSkeleton from './BlogListSkeleton';
import BlogsNav from './BlogsNav';

import { CreativeCommons } from 'components/CreativeCommons';
import { BlogsList } from 'components/Blogs';
import STYLES from './blogs-page.scss';
import Head from 'next/head';
import appConfig from 'helpers/appConfig';

const getClassName = cssModules(STYLES);

const BlogList = props => {
  const {
    ssrBlogs,
    loadBlogs,
    deleteBlog,
    filter,
    authenticatorState,
    blogListState,
    selectedNav,
    linkPrefix,
    className,
  } = props;

  useEffect(() => {
    loadBlogs();
  }, []);

  let filteredBlogs = blogListState.blogs || ssrBlogs;
  if (filter && filteredBlogs && filteredBlogs.filter) {
    filteredBlogs = filteredBlogs.filter(filter);
  }

  const outerClassNameFinal = [getClassName('blogs-page__wrapper')];

  if (className) {
    outerClassNameFinal.push(className);
  }

  const admin = authenticatorState.user && authenticatorState.user.admin;

  return (
    <>
      <DebugObject
        debugTitle="Blogs"
        debugObject={{
          loadBlogs,
          deleteBlog,
          filter,
          blogListState,
          selectedNav,
          linkPrefix,
          className,
        }}
      />
      <Head>
        <title>{`${selectedNav} - ${appConfig.projectTitle}`}</title>
      </Head>
      <BlogsNav className={getClassName('blogs-page__navigation')} selected={selectedNav} />
      <LoadingCover loadingSkeleton={BlogListSkeleton} loading={!filteredBlogs} error={!!blogListState.blogsLoadError}>
        <>
          {filteredBlogs && (
            <BlogsList
              admin={admin}
              blogs={filteredBlogs}
              linkPrefix={linkPrefix}
              deleteBlog={admin ? deleteBlog : null}
            />
          )}
        </>
      </LoadingCover>
      <CreativeCommons />
    </>
  );
};

BlogList.propTypes = {
  blogsLoadError: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  // eslint-disable-next-line react/forbid-prop-types
  ssrBlogs: PropTypes.arrayOf(PropTypes.object),
  blogListState: PropTypes.shape({
    blogs: PropTypes.arrayOf(PropTypes.object),
    blogsLoadError: PropTypes.object,
  }),
  authenticatorState: PropTypes.shape({
    user: PropTypes.object,
  }).isRequired,
  filter: PropTypes.func,
  linkPrefix: PropTypes.string,
  loadBlogs: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  className: PropTypes.string,
  selectedNav: PropTypes.string,
};

BlogList.defaultProps = {
  blogsLoadError: false,
  ssrBlogs: null,
  filter: null,
  linkPrefix: null,
  className: null,
  selectedNav: null,
};

export default BlogList;
