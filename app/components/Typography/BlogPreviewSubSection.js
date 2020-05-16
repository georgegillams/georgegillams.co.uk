import PropTypes from 'prop-types';
import React from 'react';
import { cssModules } from 'gg-components/helpers/cssModules';

import { SubSection } from 'gg-components/Typography';
import BlogPreviewContent from './BlogPreviewContent';

import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES);

const BlogPreviewSubSection = props => {
  const {
    blogSubSection,
    className,
    elementClassName,
    light,
    anchor,
    references,
    ...rest
  } = props;

  const classNameFinal = [];
  if (className) {
    classNameFinal.push(className);
  }
  const elementClassNameFinal = [getClassName('pages__card')];
  if (elementClassName) {
    elementClassNameFinal.push(elementClassName);
  }

  if (!blogSubSection || blogSubSection === '') {
    return null;
  }

  const blogSubSectionParts = blogSubSection.split('\n');
  const blogSubSectionName = blogSubSectionParts.shift();

  const blogSubSectionContent = blogSubSectionParts.join('\n');

  return (
    <SubSection
      className={elementClassNameFinal.join(' ')}
      name={blogSubSectionName}
      light={light}
      anchor={anchor}
      {...rest}
    >
      <BlogPreviewContent
        references={references}
        content={blogSubSectionContent}
        elementClassName={elementClassName}
      />
    </SubSection>
  );
};

BlogPreviewSubSection.propTypes = {
  references: PropTypes.object,
  blogSubSection: PropTypes.string.isRequired,
  className: PropTypes.string,
  elementClassName: PropTypes.string,
  light: PropTypes.bool,
  anchor: PropTypes.bool,
};

BlogPreviewSubSection.defaultProps = {
  references: null,
  className: null,
  elementClassName: null,
  light: false,
  anchor: true,
};

export default BlogPreviewSubSection;
