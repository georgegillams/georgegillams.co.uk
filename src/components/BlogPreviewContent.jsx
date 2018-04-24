import PropTypes from 'prop-types';
import React from 'react';
import TextLink from './TextLink';

import STYLES from './article-date.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const MD_LINK_REGEX = /\[([^\[\]]*)\]\(([^\(\)]*)\)/gi;

// This component works recursively. Each time it checks for a feature (such as a link, stikethrough etc)
// At each stage, if it finds one it renders the appropriate component, passing the surrounding text to
// another instance of BlogPreviewContent. if no such feature is found, the content is simply rendered.

const BlogPreviewContent = props => {
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

  const mdLink = content.split(MD_LINK_REGEX);
  if (mdLink.length > 3) {
    console.log(content);
    console.log(content.split(MD_LINK_REGEX));
    const preLinkText = mdLink.shift();
    const linkText = mdLink.shift();
    const linkRef = mdLink.shift();
    const postLinkText = mdLink.join('');
    return (
      <div className={classNameFinal.join(' ')} {...rest}>
        <TextLink inline href={linkRef}>
          {linkText}
        </TextLink>
      </div>
    );
  }

  // Otherwise we just return the block of text:
  return (
    <div className={classNameFinal.join(' ')} {...rest}>
      {contentParts.map(s => (
        <p className={elementClassNameFinal.join(' ')}>{s}</p>
      ))}
    </div>
  );
};

BlogPreviewContent.propTypes = {
  content: PropTypes.string.isRequired,
  className: PropTypes.string,
  elementClassName: PropTypes.string,
  light: PropTypes.bool,
  noAnchor: PropTypes.bool,
};

BlogPreviewContent.defaultProps = {
  className: null,
  elementClassName: null,
  light: false,
  noAnchor: false,
};

export default BlogPreviewContent;
