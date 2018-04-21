import PropTypes from 'prop-types';
import React from 'react';
import Section from './Section';
import BlogPreviewSubSection from './BlogPreviewSubSection';
import BlogPreviewContent from './BlogPreviewContent';

import STYLES from './article-date.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const BlogPreviewSection = props => {
  const {
    blogSection,
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

  if (!blogSection || blogSection === '') {
    return null;
  }

  const blogSectionParts = blogSection.split('\n');
  const blogSectionName = blogSectionParts.shift();

  const blogSectionContent = blogSectionParts.join('\n');
  const blogSubSections = blogSectionContent.split('\n## ');
  const sectionTopLevelContent = blogSubSections.shift();

  return (
    <Section
      className={elementClassNameFinal.join(' ')}
      name={blogSectionName}
      light={light}
      noAnchor={noAnchor}
      {...rest}
    >
      <BlogPreviewContent
        content={sectionTopLevelContent}
        elementClassName={elementClassName}
      />
      {blogSubSections.map(s => (
        <BlogPreviewSubSection
          blogSubSection={s}
          elementClassName={elementClassName}
          light={light}
          noAnchor={noAnchor}
        />
      ))}
    </Section>
  );
};

BlogPreviewSection.propTypes = {
  blogSection: PropTypes.string.isRequired,
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
