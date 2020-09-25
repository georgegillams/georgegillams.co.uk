import React from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'gg-components/helpers/cssModules';
import TextLink from 'components/common/TextLink';

import STYLES from './footer-nav.scss';

const getClassName = cssModules(STYLES);

const TechSpecs = props => {
  const { className, ...rest } = props;

  return (
    <div className={getClassName('footer-nav__container', className)} {...rest}>
      <TextLink className={getClassName('footer-nav__link')} href="/photography">
        Photo
      </TextLink>
      <TextLink className={getClassName('footer-nav__link')} href="/work">
        Work
      </TextLink>
      <TextLink className={getClassName('footer-nav__link')} href="/contact">
        Contact
      </TextLink>
      <TextLink className={getClassName('footer-nav__link')} href="/privacy-policy">
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
