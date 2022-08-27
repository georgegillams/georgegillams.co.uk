import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DebugObject from 'components/common/DebugObject';
import LoadingCover from '@george-gillams/components/loading-cover';
import ArticleDate from '@george-gillams/components/article-date';
import MarkdownRenderer from '@george-gillams/components/markdown-renderer';

import BlogRendererSkeleton from './BlogRendererSkeleton';

import { CreativeCommons } from 'components/CreativeCommons';
import PageTitle from 'components/common/PageTitle';
import Tag from '@george-gillams/components/tag';
import ErrorDisplay from 'components/common/ErrorDisplay';
import LoadableBlogForm from './LoadableBlogForm';
import Section from '@george-gillams/components/section';
import Head from 'next/head';
import PageContainer, { WIDTHS } from 'components/common/PageContainer';
import { DateContainer, TagList } from './blog-renderer.styles';

const BlogRenderer = props => {
  const { blogSubcategory, ssrBlog, blogId, loadBlog, updateBlog, blogRenderState, authenticatorState, linkPrefix } =
    props;

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
      <PageContainer width={WIDTHS.prose}>
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
          }}
        />
        <ErrorDisplay message="This blog couldn't be loaded" error={blogRenderState.loadBlogError}></ErrorDisplay>
        <LoadingCover loadingSkeleton={BlogRendererSkeleton} loading={!blog} error={!!blogRenderState.loadBlogError}>
          <>
            {blog && (
              <PageTitle name={blog.title} link={{ to: linkPrefix, text: blogSubcategory }}>
                <DateContainer>
                  <ArticleDate date={blogDate} />
                </DateContainer>
                {tags && (
                  <TagList>
                    {tags.map(tagType => (
                      <Tag key={tagType} type={tagType} ariaLabel={tagType} link />
                    ))}
                  </TagList>
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
      </PageContainer>
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
};

BlogRenderer.defaultProps = {
  ssrBlog: null,
};

export default BlogRenderer;
