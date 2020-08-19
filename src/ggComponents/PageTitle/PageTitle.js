import React from 'react';
import PropTypes from 'prop-types';

import { cssModules } from '../helpers/cssModules';
import { Section } from '../Section';
import { TextLink } from '../TextLink';

import STYLES from './page-title.module.scss';

const getClassName = cssModules(STYLES);

const PageTitle = props => {
  const { link, renderLink, headingProps, linkProps, ...rest } = props;

  const sectionClassNames = [getClassName('page-title__section')];

  if (link) {
    sectionClassNames.push(getClassName('page-title__section--with-link'));
  }

  let linkElement = null;
  if (link) {
    const linkHref = link.to;
    const linkText = `⇠ ${link.text}`;
    const linkClassName = getClassName('page-title__link');

    if (renderLink) {
      linkElement = renderLink(linkHref, linkText, linkClassName);
    } else {
      linkElement = (
        <TextLink className={linkClassName} href={linkHref} {...linkProps}>
          {linkText}
        </TextLink>
      );
    }
  }

  return (
    <>
      {linkElement && linkElement}
      <Section headingProps={headingProps} textClassName={sectionClassNames.join(' ')} {...rest} />
    </>
  );
};

PageTitle.propTypes = {
  name: PropTypes.string,
  link: PropTypes.shape({
    to: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }),
  // eslint-disable-next-line react/forbid-prop-types
  headingProps: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  linkProps: PropTypes.object,
  renderLink: PropTypes.func,
};

PageTitle.defaultProps = {
  name: null,
  link: null,
  headingProps: null,
  linkProps: null,
  renderLink: null,
};

export default PageTitle;
