import React from 'react';
import PropTypes from 'prop-types';
import BpkCard from 'bpk-component-card';
import Section from './Section';

import STYLES from './card.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const Card = (props) => {
  const {
    light, linkUrl, imageSrc, title, className, ...rest
  } = props;

  const classNameFinal = [getClassName('card__image')];
  if (className) classNameFinal.push(className);

  return (
    <BpkCard className={classNameFinal.join(' ')} style={{ backgroundImage: `url(${imageSrc})` }} href={linkUrl} {...rest}>
      <Section light={light} name={title} link />
    </BpkCard>
  );
};

Card.propTypes = {
  light: PropTypes.bool,
  imageSrc: PropTypes.node,
  linkUrl: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string,
};

Card.defaultProps = {
  light: false,
  linkUrl: null,
  imageSrc: null,
  title: null,
  className: null,
};

export default Card;
