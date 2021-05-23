import React from 'react';
import PropTypes from 'prop-types';

import { Image } from '@george-gillams/components/Image';
import STYLES from './sliding-phone.scss';
import { cssModules } from '@george-gillams/components/helpers/cssModules';
import { useEntryAnimationClientOnly } from '@george-gillams/components/ServerSideRendering';

const getClassName = cssModules(STYLES);

const SlidingPhone = props => {
  const { show, className, lightSrc, darkSrc, imgProps, ...rest } = props;

  const [isFirstRender, animationsEnabled] = useEntryAnimationClientOnly();

  return (
    <div className={getClassName('sliding-phone__outer', className)} {...rest}>
      <Image
        className={getClassName(
          'sliding-phone__image',
          !isFirstRender && !show && 'sliding-phone__image--hide',
          animationsEnabled && 'sliding-phone__image--animated'
        )}
        aspectX={1004}
        aspectY={1986}
        lightSrc={lightSrc}
        darkSrc={darkSrc}
        imgProps={imgProps}
      />
    </div>
  );
};

SlidingPhone.propTypes = {
  show: PropTypes.bool,
  className: PropTypes.string,
  lightSrc: PropTypes.string.isRequired,
  imgProps: PropTypes.object.isRequired,
  darkSrc: PropTypes.string.isRequired,
};

SlidingPhone.defaultProps = { show: false, className: null };

export default SlidingPhone;
