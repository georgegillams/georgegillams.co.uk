import React from 'react';
import PropTypes from 'prop-types';

import { Image } from 'gg-components/Image';
import STYLES from './photo-section.scss';
import { cssModules } from 'gg-components/helpers/cssModules';

const getClassName = cssModules(STYLES);

const LifeSection = props => {
  const { className, ...rest } = props;

  return (
    <div className={getClassName(className)} style={{ width: '70%' }} {...rest}>
      <Image
        className={getClassName('about__image')}
        imgProps={{
          alt: 'Me',
        }}
        aspectX={3829}
        aspectY={2872}
        lightSrc="https://i.imgur.com/FLA0jkg.jpg"
        darkSrc="https://i.imgur.com/FLA0jkg.jpg"
      />
    </div>
  );
};

LifeSection.propTypes = { className: PropTypes.string };

LifeSection.defaultProps = { className: null };

export default LifeSection;
