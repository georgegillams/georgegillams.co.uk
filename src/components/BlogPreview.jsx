import PropTypes from 'prop-types';
import React from 'react';
import BlogPreviewSection from './BlogPreviewSection';

import STYLES from './article-date.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const BlogPreview = props => {
  const { blog, className, elementClassName, light, noAnchor, ...rest } = props;

  const classNameFinal = [getClassName('article-date__date')];
  if (className) {
    classNameFinal.push(className);
  }
  const elementClassNameFinal = [getClassName('pages__card')];
  if (elementClassName) {
    elementClassNameFinal.push(elementClassName);
  }

  const blogContent = `\n# ${blog.blogName}\n${blog.blogContent}`;

  if (!blogContent || blogContent === '') {
    return null;
  }

  const blogSections = blogContent.split('\n# ');
  blogSections.shift();

  return (
    <div
      className={classNameFinal.join(' ')}
      style={{ backgroundColor: 'black' }}
      {...rest}
    >
      {blogSections.map(s => (
        <BlogPreviewSection
          blogSection={s}
          elementClassName={elementClassName}
          light={light}
          noAnchor={noAnchor}
        />
      ))}
    </div>
  );
};

BlogPreview.propTypes = {
  blog: PropTypes.object.isRequired,
  elementClassName: PropTypes.string,
  className: PropTypes.string,
  light: PropTypes.bool,
  noAnchor: PropTypes.bool,
};

BlogPreview.defaultProps = {
  elementClassName: null,
  className: null,
  light: false,
  noAnchor: false,
};

export default BlogPreview;
