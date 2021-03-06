import React from 'react';
import PropTypes from 'prop-types';
import { cssModules } from '@george-gillams/components/helpers/cssModules';
import { THEMES } from '@george-gillams/components/Theming';
import TextLink from 'components/common/TextLink';

import STYLES from './footer-nav.scss';

const getClassName = cssModules(STYLES);

const TechSpecs = props => {
  const { className, ...rest } = props;

  return (
    <div className={getClassName('footer-nav__container', className)} {...rest}>
      <TextLink className={getClassName('footer-nav__link')} theme={THEMES.allWhite} href="/photography">
        Photo
      </TextLink>
      <TextLink className={getClassName('footer-nav__link')} theme={THEMES.allWhite} href="/work">
        Work
      </TextLink>
      <TextLink className={getClassName('footer-nav__link')} theme={THEMES.allWhite} href="/contact">
        Contact
      </TextLink>
      <TextLink className={getClassName('footer-nav__link')} theme={THEMES.allWhite} href="/privacy-policy">
        Privacy
      </TextLink>
    </div>
  );
};

TechSpecs.propTypes = {
  className: PropTypes.string,
};

TechSpecs.defaultProps = {
  className: null,
};

export default TechSpecs;
