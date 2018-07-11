import PropTypes from 'prop-types';
import React from 'react';
import { cssModules } from 'bpk-react-utils';
import BlogRenderer from './BlogRenderer';

import STYLES from './article-date.scss';

const getClassName = cssModules(STYLES);

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

  if (!blog) {
    return null;
  }

  return (
    <div
      className={classNameFinal.join(' ')}
      style={{ backgroundColor: 'black' }}
      {...rest}
    >
      <BlogRenderer
        blog={blog}
        elementClassName={elementClassNameFinal.join(' ')}
        light={light}
        noAnchor={noAnchor}
      />
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
