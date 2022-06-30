import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import DebugObject from 'components/common/DebugObject';
import LoadingCover from '@george-gillams/components/loading-cover';

import BlogListSkeleton from './BlogListSkeleton';

import { CreativeCommons } from 'components/CreativeCommons';
import { BlogsList } from 'components/Blogs';
import Head from 'next/head';
import appConfig from 'helpers/appConfig';
import { StyledPageContainer } from './container.styles';

const BlogList = props => {
  const { ssrBlogs, loadBlogs, deleteBlog, filter, authenticatorState, blogListState, linkPrefix } = props;

  useEffect(() => {
    loadBlogs();
  }, []);

  let filteredBlogs = blogListState.blogs || ssrBlogs;
  if (filter && filteredBlogs && filteredBlogs.filter) {
    filteredBlogs = filteredBlogs.filter(filter);
  }

  const admin = authenticatorState.user && authenticatorState.user.admin;

  return (
    <>
      <StyledPageContainer>
        <DebugObject
          debugTitle="Blogs"
          debugObject={{
            loadBlogs,
            deleteBlog,
            filter,
            blogListState,
            linkPrefix,
          }}
        />
        <Head>
          <title>{`Blog - ${appConfig.projectTitle}`}</title>
        </Head>
        <LoadingCover
          loadingSkeleton={BlogListSkeleton}
          loading={!filteredBlogs}
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
      </StyledPageContainer>
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
};

BlogList.defaultProps = {
  blogsLoadError: false,
  ssrBlogs: null,
  filter: null,
  linkPrefix: null,
};

export default BlogList;
