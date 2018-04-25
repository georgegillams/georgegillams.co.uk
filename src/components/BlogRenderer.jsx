import PropTypes from 'prop-types';
import React from 'react';
import BlogPreviewSection from './BlogPreviewSection';
import Section from './Section';
import ScrollIndicator from './ScrollIndicator';
import PageSwitchScroller from './PageSwitchScroller';
import Tag from './Tag';
import ArticleDate from './ArticleDate';

import STYLES from './article-date.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const BlogRenderer = props => {
  const { blog, className, elementClassName, light, noAnchor, ...rest } = props;

  const classNameFinal = [getClassName('article-date__date')];
  if (className) {
    classNameFinal.push(className);
  }
  const elementClassNameFinal = [getClassName('pages__card')];
  if (elementClassName) {
    elementClassNameFinal.push(elementClassName);
  }

  const blogContent = `\n${blog.blogContent}`;

  if (!blogContent || blogContent === '') {
    return null;
  }

  const blogSections = blogContent.split('\n# ');

  return (
    <div className={classNameFinal.join(' ')} {...rest}>
      <ScrollIndicator />
      <PageSwitchScroller />
      <Section
        className={elementClassNameFinal.join(' ')}
        name={blog.blogName}
        light={light}
        noAnchor={noAnchor}
      >
        <ArticleDate
          className={elementClassNameFinal.join(' ')}
          date={new Date(1000 * blog.publishedTimestamp)}
        />
        <div style={{ marginBottom: '1.5rem' }}>
          {blog.blogTags &&
            blog.blogTags.map(g => (
              <Tag type={g} link style={{ marginBottom: '0.5rem' }} />
            ))}
        </div>
        {blogSections.map(s => (
          <BlogPreviewSection
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
  blog: PropTypes.object.isRequired,
  elementClassName: PropTypes.string,
  className: PropTypes.string,
  light: PropTypes.bool,
  noAnchor: PropTypes.bool,
};

BlogRenderer.defaultProps = {
  elementClassName: null,
  className: null,
  light: false,
  noAnchor: false,
};

export default BlogRenderer;
