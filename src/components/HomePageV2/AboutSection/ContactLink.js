import React, { useState } from 'react';
import PropTypes from 'prop-types';

import TextLink from 'components/common/TextLink';
import STYLES from './contact-link.scss';
import { cssModules } from 'gg-components/helpers/cssModules';
import { useEntryAnimationClientOnly } from 'gg-components/ServerSideRendering';

const getClassName = cssModules(STYLES);

const ContactLink = props => {
  const { scrollPosition, className, ...rest } = props;
  const [isFirstRender] = useEntryAnimationClientOnly();
  const [hovering, setHovering] = useState(false);
  const hide = isFirstRender || hovering;

  // We want to adjust the value to be always between 14 and 300
  const normalisedUpper = 300;
  const normalisedLower = 14;
  const scrollPositionFactor = 100 - Math.min(100, Math.max(0, scrollPosition));
  const scrollPositionNormalised = normalisedLower + ((normalisedUpper - normalisedLower) * scrollPositionFactor) / 100;

  return (
    <div className={getClassName('contact-link__outer', className)} {...rest}>
      <div
        className={getClassName('contact-link__content', className)}
        onMouseEnter={() => {
          setHovering(true);
        }}
        onMouseLeave={() => {
          setHovering(false);
        }}>
        <TextLink className={getClassName('contact-link__link')} href="/contact">
          Get in touch
        </TextLink>
        <div
          style={hide ? {} : { left: `${scrollPositionNormalised}%` }}
          className={getClassName('contact-link__cloud', hide && 'contact-link__cloud--hide')}
        />
      </div>
    </div>
  );
};

ContactLink.propTypes = {
  scrollPosition: PropTypes.number.isRequired,
  className: PropTypes.string,
};

ContactLink.defaultProps = { className: null };

export default ContactLink;
