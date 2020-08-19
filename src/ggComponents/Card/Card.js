/* eslint-disable react/display-name */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { cssModules } from '../helpers/cssModules';

import STYLES from './card.module.scss';

const getClassName = cssModules(STYLES);

const Card = React.forwardRef((props, ref) => {
  const [hovering, setHovering] = useState(false);
  const [focused, setFocused] = useState(false);

  const {
    href,
    hrefDumb,
    onClick,
    padded,
    bannerColor,
    fillImageSrc,
    light,
    className,
    backgroundImageClassName,
    children,
    disabled,
    onHoverChanged,
    highlighted,
    ...rest
  } = props;

  const propagate = newValue => {
    if (onHoverChanged) {
      onHoverChanged(newValue);
    }
  };

  const hoverStarted = () => {
    const newValue = true;
    setHovering(newValue);
    propagate(focused || newValue);
  };

  const hoverEnded = () => {
    const newValue = false;
    setHovering(newValue);
    propagate(focused || newValue);
  };

  const focusStarted = () => {
    const newValue = true;
    setFocused(newValue);
    propagate(hovering || newValue);
  };

  const focusEnded = () => {
    const newValue = false;
    setFocused(newValue);
    propagate(hovering || newValue);
  };

  const focusedState = hovering || focused;

  const cardClassNames = [getClassName('card')];

  const bannerClassNames = [getClassName('card__banner')];
  if (light) {
    bannerClassNames.push(getClassName('card__banner--light'));
  }
  if (focusedState && !disabled) {
    bannerClassNames.push(getClassName('card__banner--hovered'));
  }
  const outerBannerClassNames = [getClassName('card__outer-container')];
  if (padded) {
    outerBannerClassNames.push(getClassName('card__outer-container--padded'));
  }

  const backgroundImageClassNames = [getClassName('card__background')];
  if (highlighted) {
    backgroundImageClassNames.push(getClassName('card__background--highlighted'));
  }
  if (disabled) {
    backgroundImageClassNames.push(getClassName('card__background--disabled'));
  }
  if (light) {
    backgroundImageClassNames.push(getClassName('card__background--light'));
  }
  if (backgroundImageClassName) {
    backgroundImageClassNames.push(backgroundImageClassName);
  }

  const cardComponent = (
    <div className={cardClassNames.join(' ')}>
      <div className={backgroundImageClassNames.join(' ')} style={{ backgroundImage: `url(${fillImageSrc})` }} />
      <div className={outerBannerClassNames.join(' ')}>{children}</div>
      <div className={bannerClassNames.join(' ')} style={bannerColor ? { backgroundColor: bannerColor } : {}} />
    </div>
  );

  if (href && !disabled) {
    return (
      <a
        aria-disabled={disabled ? 'true' : null}
        style={{ textDecoration: 'none' }}
        role="button"
        href={hrefDumb ? null : href}
        onMouseEnter={hoverStarted}
        onFocus={focusStarted}
        onMouseLeave={hoverEnded}
        onBlur={focusEnded}
        className={className}
        onClick={onClick}
        ref={ref}
        {...rest}>
        {cardComponent}
      </a>
    );
  }

  return (
    <div
      tabIndex="0"
      role="button"
      aria-disabled={disabled ? 'true' : null}
      onMouseEnter={hoverStarted}
      onFocus={focusStarted}
      onMouseLeave={hoverEnded}
      onBlur={focusEnded}
      className={className}
      onClick={disabled ? null : onClick}
      onKeyDown={disabled ? null : onClick}
      ref={ref}
      {...rest}>
      {cardComponent}
    </div>
  );
});

Card.propTypes = {
  ariaLabel: PropTypes.string,
  backgroundImageClassName: PropTypes.string,
  bannerColor: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  fillImageSrc: PropTypes.node,
  href: PropTypes.string,
  hrefDumb: PropTypes.bool,
  light: PropTypes.bool,
  onClick: PropTypes.func,
  onHoverChanged: PropTypes.func,
  padded: PropTypes.bool,
  highlighted: PropTypes.bool,
};

Card.defaultProps = {
  ariaLabel: null,
  backgroundImageClassName: null,
  bannerColor: null,
  children: null,
  className: null,
  disabled: false,
  fillImageSrc: null,
  href: null,
  hrefDumb: false,
  light: false,
  onClick: null,
  onHoverChanged: null,
  padded: true,
  highlighted: false,
};

export default Card;
