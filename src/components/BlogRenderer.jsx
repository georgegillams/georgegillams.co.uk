import PropTypes from 'prop-types';
import React from 'react';

import bibtexParse from 'bibtex-parse-js';

import BlogPreviewSection from './BlogPreviewSection';
import Section from './Section';
import SubSection from './SubSection';
import ScrollIndicator from './ScrollIndicator';
import Tag from './Tag';
import ArticleDate from './ArticleDate';

import STYLES from './blogs.scss';
import STYLES_2 from '../components/tag-filter.scss';

const getClassName = className =>
  STYLES[className] || STYLES_2[className] || 'UNKNOWN';

const BlogRenderer = props => {
  const {
    blog,
    className,
    centered,
    elementClassName,
    light,
    showEditLink,
    noAnchor,
    ...rest
  } = props;

  const classNameFinal = [getClassName('article-date__date')];
  if (className) {
    classNameFinal.push(className);
  }
  const elementClassNameFinal = [getClassName('pages__card')];
  if (elementClassName) {
    elementClassNameFinal.push(elementClassName);
  }
  if (centered) {
    elementClassNameFinal.push(getClassName('blogs--centered'));
  }

  if (!blog.blogContent || blog.blogContent === '') {
    return null;
  }

  const blogContent = `\n${blog.blogContent}`;

  const blogSections = blogContent.split('\n# ');

  const references = blog.blogBibtex
    ? bibtexParse.toJSON(blog.blogBibtex)
    : null;

  return (
    <div className={classNameFinal.join(' ')} {...rest}>
      <ScrollIndicator />
      <Section
        className={elementClassNameFinal.join(' ')}
        name={blog.blogName}
        light={light}
        noAnchor
      >
        {showEditLink && (
          <a
            className={getClassName('pages__link')}
            href={`/admin/blog-editor?id=${blog.blogId}`}
          >
            <SubSection
              textClassName={getClassName('blogs__edit-link')}
              name="Edit this blog"
              noAnchor
              link
            />
          </a>
        )}
        <ArticleDate
          className={elementClassNameFinal.join(' ')}
          date={new Date(1000 * blog.publishedTimestamp)}
        />
        <div style={{ marginBottom: '1.0rem' }}>
          {blog.blogTags &&
            blog.blogTags.map(g => (
              <Tag
                className={getClassName('tag-filter__tag')}
                type={g}
                ariaLabel={`View all ${g} blogs`}
                link
                style={{ marginBottom: '0.5rem' }}
              />
            ))}
        </div>
        {blogSections.map(s => (
          <BlogPreviewSection
            references={references}
            blogSection={s}
            elementClassName={elementClassName}
            light={light}
            noAnchor={noAnchor}
          />
        ))}
      </Section>
    </div>
  );
};

BlogRenderer.propTypes = {
  centered: PropTypes.bool,
  blog: PropTypes.object.isRequired,
  showEditLink: PropTypes.boolean,
  elementClassName: PropTypes.string,
  className: PropTypes.string,
  light: PropTypes.bool,
  noAnchor: PropTypes.bool,
};

BlogRenderer.defaultProps = {
  centered: false,
  elementClassName: null,
  showEditLink: false,
  className: null,
  light: false,
  noAnchor: false,
};

export default BlogRenderer;
