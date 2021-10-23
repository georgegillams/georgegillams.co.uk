import React from 'react';
import PropTypes from 'prop-types';

import { Image } from '@george-gillams/components/Image';
import STYLES from './animated-image.scss';
import { cssModules } from '@george-gillams/components/helpers/cssModules';
import { useEntryAnimationClientOnly } from '@george-gillams/components/ServerSideRendering';

const getClassName = cssModules(STYLES);

const AnimatedImage = props => {
  const { show, className, ...rest } = props;

  const [isFirstRender, animationsEnabled] = useEntryAnimationClientOnly();

  return (
    <div className={getClassName('animated-image__outer', className)} {...rest}>
      <Image
        className={getClassName(
          'animated-image__image',
          !isFirstRender && !show && 'animated-image__image--hide',
          animationsEnabled && 'animated-image__image--animated'
        )}
        imgProps={{
          alt: 'Me',
        }}
        aspectX={4667}
        aspectY={3304}
        lightSrc="https://i.imgur.com/L0Rm1ZC.jpg"
        darkSrc="https://i.imgur.com/L0Rm1ZC.jpg"
      />
    </div>
  );
};

AnimatedImage.propTypes = { show: PropTypes.bool.isRequired, className: PropTypes.string };

AnimatedImage.defaultProps = { className: null };

export default AnimatedImage;
