import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'gg-components/helpers/cssModules';
import DebugObject from 'components/common/DebugObject';
import { LoadingCover } from 'gg-components/LoadingCover';
import { ArticleDate } from 'gg-components/ArticleDate';
import { MarkdownRenderer } from 'gg-components/MarkdownRenderer';

import BlogRendererSkeleton from './BlogRendererSkeleton';

import { CreativeCommons } from 'components/CreativeCommons';
import STYLES from './blog-renderer.scss';
import PageTitle from 'components/common/PageTitle';
import Tag from 'gg-components/Tag/Tag';
import Paragraph from 'gg-components/Paragraph/Paragraph';
import LoadableBlogForm from './LoadableBlogForm';
import Section from 'gg-components/Section/Section';
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
      {blogRenderState.blogLoadError && (
        <>
          <Paragraph>Something has gone wrong while loading the blog.</Paragraph>
          <Paragraph>${blogRenderState.blogLoadError.errorMessage}</Paragraph>
        </>
      )}
      <LoadingCover loadingSkeleton={BlogRendererSkeleton} loading={!blog} error={!!blogRenderState.blogLoadError}>
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
              {blogRenderState.blogUpdateError && (
                <Paragraph style={{ width: '100%', marginBottom: '1rem' }}>
                  {blogRenderState.blogUpdateError.errorMessage}
                </Paragraph>
              )}
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
    blogLoadError: PropTypes.object,
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
