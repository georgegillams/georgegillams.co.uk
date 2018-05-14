import PropTypes from 'prop-types';
import React from 'react';

import bibtexParse from 'bibtex-parse-js';

import BlogPreviewSection from './BlogPreviewSection';
import Section from './Section';
import ScrollIndicator from './ScrollIndicator';
import PageSwitchScroller from './PageSwitchScroller';
import Tag from './Tag';
import ArticleDate from './ArticleDate';

import STYLES from './blogs.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const BlogRenderer = props => {
  const {
    blog,
    className,
    centered,
    elementClassName,
    light,
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
        <ArticleDate
          className={elementClassNameFinal.join(' ')}
          date={new Date(1000 * blog.publishedTimestamp)}
        />
        <div style={{ marginBottom: '1.0rem' }}>
          {blog.blogTags &&
            blog.blogTags.map(g => (
              <Tag type={g} link style={{ marginBottom: '0.5rem' }} />
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
  elementClassName: PropTypes.string,
  className: PropTypes.string,
  light: PropTypes.bool,
  noAnchor: PropTypes.bool,
};

BlogRenderer.defaultProps = {
  centered: false,
  elementClassName: null,
  className: null,
  light: false,
  noAnchor: false,
};

export default BlogRenderer;
