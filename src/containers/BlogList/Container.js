import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'ggComponents/helpers/cssModules';
import { LoadingCover } from 'ggComponents/LoadingCover';

import Head from 'next/head';
import appConfig from 'helpers/appConfig';

import DebugObject from 'components/common/DebugObject';
import { CreativeCommons } from 'components/CreativeCommons';
import { BlogsList } from 'components/Blogs';

import BlogListSkeleton from './BlogListSkeleton';
import BlogsNav from './BlogsNav';

import STYLES from './blogs-page.module.scss';

const getClassName = cssModules(STYLES);

const BlogList = props => {
  const {
    loadBlogs,
    deleteBlog,
    filter,
    authenticatorState,
    blogListState,
    selectedNav,
    linkPrefix,
    className,
  } = props;

  const [filteredBlogs, setFilteredBlogs] = useState(null);

  useEffect(() => {
    loadBlogs();
  }, []);

  useEffect(() => {
    if (!blogListState.blogs) {
      return;
    }
    if (filter) {
      setFilteredBlogs(blogListState.blogs.filter(filter));
    } else {
      setFilteredBlogs(blogListState.blogs);
    }
  }, [blogListState, filter]);

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
      <LoadingCover
        loadingSkeleton={BlogListSkeleton}
        loading={!blogListState.blogs}
        error={!!blogListState.blogsLoadError}>
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
  blogs: null,
  filter: null,
  linkPrefix: null,
  className: null,
  selectedNav: null,
};

export default BlogList;
