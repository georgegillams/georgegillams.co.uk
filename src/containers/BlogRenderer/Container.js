import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { cssModules } from '@george-gillams/components/helpers/cssModules';
import DebugObject from 'components/common/DebugObject';
import LoadingCover from '@george-gillams/components/loading-cover';
import ArticleDate from '@george-gillams/components/article-date';
import MarkdownRenderer from '@george-gillams/components/markdown-renderer';

import BlogRendererSkeleton from './BlogRendererSkeleton';

import { CreativeCommons } from 'components/CreativeCommons';
import STYLES from './blog-renderer.scss';
import PageTitle from 'components/common/PageTitle';
import Tag from '@george-gillams/components/tag';
import ErrorDisplay from 'components/common/ErrorDisplay';
import LoadableBlogForm from './LoadableBlogForm';
import Section from '@george-gillams/components/section';
import Head from 'next/head';

const getClassName = cssModules(STYLES);

const BlogRenderer = props => {
  const {
    blogSubcategory,
    ssrBlog,
    blogId,
    loadBlog,
    updateBlog,
    blogRenderState,
    authenticatorState,
    linkPrefix,
    className,
  } = props;

  const [newBlog, setNewBlog] = useState(null);

  useEffect(() => {
    loadBlog(blogId);
  }, []);

  let blog = null;
  if (blogRenderState.blogs && blogRenderState.blogs[blogId]) {
    blog = blogRenderState.blogs[blogId];
  } else if (ssrBlog) {
    blog = ssrBlog;
  }

  let tags = [];
  if (blog && blog.tags && blog.tags.split) {
    tags = blog.tags.split(', ');
  }
  if (blog && blog.tags && blog.tags.map) {
    tags = blog.tags;
  }

  let blogDate = null;
  if (blog && blog.publishedTimestamp) {
    blogDate = new Date(1000 * blog.publishedTimestamp);
  }
  if (process.env.NODE_ENV === 'test') {
    blogDate = { toString: () => 'TEST_DATE' };
  }

  const outerClassNameFinal = [getClassName('blogs-page__wrapper')];

  if (className) {
    outerClassNameFinal.push(className);
  }

  return (
    <>
      {blog && (
        <Head>
          {blog.blogImage && (
            <>
              <meta key="og:image" name="og:image" content={blog.blogImage} />
              <meta key="twitter:image" name="twitter:image" content={blog.blogImage} />
            </>
          )}
        </Head>
      )}
      <DebugObject
        debugTitle="Blog"
        debugObject={{
          blogSubcategory,
          ssrBlog,
          blogId,
          loadBlog,
          blogRenderState,
          authenticatorState,
          linkPrefix,
          className,
        }}
      />
      <ErrorDisplay message="This blog couldn't be loaded" error={blogRenderState.loadBlogError}></ErrorDisplay>
      <LoadingCover loadingSkeleton={BlogRendererSkeleton} loading={!blog} error={!!blogRenderState.loadBlogError}>
        <>
          {blog && (
            <PageTitle name={blog.title} link={{ to: linkPrefix, text: blogSubcategory }}>
              <div className={getClassName('blog-renderer__date')}>
                <ArticleDate date={blogDate} />
              </div>
              {tags && (
                <div className={getClassName('blog-renderer__tag-list')}>
                  {tags.map(tagType => (
                    <Tag
                      key={tagType}
                      type={tagType}
                      ariaLabel={tagType}
                      link
                      className={getClassName('blog-renderer__tag')}
                    />
                  ))}
                </div>
              )}
              {blog.content && <MarkdownRenderer content={blog.content} />}
            </PageTitle>
          )}
          {authenticatorState.user && authenticatorState.user.admin && (
            <Section name="EDIT BLOG">
              <ErrorDisplay message="This blog couldn't be updated" error={blogRenderState.blogUpdateError} />
              <LoadableBlogForm
                blog={newBlog || blog || {}}
                onDataChanged={setNewBlog}
                onSubmit={() => updateBlog(newBlog)}
                submitLabel="Update blog"
                disabled={blogRenderState.updatingBlog}
              />
            </Section>
          )}
        </>
      </LoadingCover>
      <CreativeCommons />
    </>
  );
};

BlogRenderer.propTypes = {
  ssrBlog: PropTypes.object,
  blogRenderState: PropTypes.shape({
    blogs: PropTypes.object,
    loadBlogError: PropTypes.object,
    updatingBlog: PropTypes.bool,
    blogUpdateError: PropTypes.object,
  }),
  authenticatorState: PropTypes.shape({
    user: PropTypes.object,
  }).isRequired,
  linkPrefix: PropTypes.string.isRequired,
  loadBlog: PropTypes.func.isRequired,
  updateBlog: PropTypes.func.isRequired,
  blogSubcategory: PropTypes.string.isRequired,
  blogId: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  className: PropTypes.string,
};

BlogRenderer.defaultProps = {
  ssrBlog: null,
  className: null,
};

export default BlogRenderer;
