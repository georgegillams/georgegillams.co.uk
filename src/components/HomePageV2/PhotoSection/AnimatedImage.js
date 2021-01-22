import React from 'react';
import PropTypes from 'prop-types';

import { Image } from 'gg-components/Image';
import STYLES from './animated-image.scss';
import { cssModules } from 'gg-components/helpers/cssModules';

const getClassName = cssModules(STYLES);

const AnimatedImage = props => {
  const { show, className, ...rest } = props;

  return (
    <div className={getClassName('animated-image__outer', className)} {...rest}>
      <Image
        className={getClassName(
          'animated-image__image',
          !show && 'animated-image__image--hide',
          'animated-image__image--animated'
        )}
        imgProps={{
          alt: 'Me',
        }}
        aspectX={3829}
        aspectY={2872}
        lightSrc="https://i.imgur.com/FLA0jkg.jpg"
        darkSrc="https://i.imgur.com/FLA0jkg.jpg"
      />
      <noscript>
        <Image
          className={getClassName('animated-image__image')}
          imgProps={{
            alt: 'Me',
          }}
          aspectX={3829}
          aspectY={2872}
          lightSrc="https://i.imgur.com/FLA0jkg.jpg"
          darkSrc="https://i.imgur.com/FLA0jkg.jpg"
        />
      </noscript>
    </div>
  );
};

AnimatedImage.propTypes = { show: PropTypes.bool.isRequired, className: PropTypes.string };

AnimatedImage.defaultProps = { className: null };

export default AnimatedImage;
