import PropTypes from 'prop-types';
import React from 'react';

import STYLES from './article-date.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const BlogPreviewSection = props => {
  const {
    content,
    className,
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

  if (!content || content === '') {
    return null;
  }

  const contentParts = content.split('\n');

  return (
    <div className={classNameFinal.join(' ')} {...rest}>
      {contentParts.map(s => <p className={elementClassName}>{s}</p>)}
    </div>
  );
};

BlogPreviewSection.propTypes = {
  content: PropTypes.string.isRequired,
  className: PropTypes.string,
  elementClassName: PropTypes.string,
  light: PropTypes.bool,
  noAnchor: PropTypes.bool,
};

BlogPreviewSection.defaultProps = {
  className: null,
  elementClassName: null,
  light: false,
  noAnchor: false,
};

export default BlogPreviewSection;
