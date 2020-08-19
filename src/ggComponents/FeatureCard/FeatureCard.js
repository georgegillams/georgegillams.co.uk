/* eslint-disable react/display-name */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { cssModules } from '../helpers/cssModules';
import { Section } from '../Section';
import { Subsection } from '../Subsection';
import { Card } from '../Card';
import { Image } from '../Image';

import STYLES from './feature-card.module.scss';

const getClassName = cssModules(STYLES);

export const FEATURE_CARD_LAYOUTS = {
  auto: 'auto',
  narrow: 'narrow',
  narrowCompact: 'narrowCompact',
};

const FeatureCard = React.forwardRef((props, ref) => {
  const [hovering, setHovering] = useState(false);

  const {
    annotations,
    imageBorder,
    imageSrc,
    title,
    imageClassName,
    layout,
    children,

    className,
    disabled,
    backgroundImageClassName,

    ...rest
  } = props;

  const classNameFinal = [getClassName('feature-card')];
  const centerClassNames = [getClassName('feature-card__center-container')];
  const contentContainerClassNames = [getClassName('feature-card__inner-container')];
  const dateContainerClassNames = [getClassName('feature-card__date')];

  if (disabled) {
    contentContainerClassNames.push(getClassName('feature-card__inner-container--disabled'));
  }

  const bannerClassNames = [getClassName('feature-card__banner')];
  if (hovering && !disabled) {
    bannerClassNames.push(getClassName('feature-card__banner--hovered'));
  }
  const outerBannerClassNames = [getClassName('feature-card__outer-container')];
  if (layout === FEATURE_CARD_LAYOUTS.narrowCompact) {
    classNameFinal.push(getClassName('feature-card--narrow-compact'));
    outerBannerClassNames.push(getClassName('feature-card__outer-container--narrow-compact'));
    centerClassNames.push(getClassName('feature-card__center-container--narrow-compact'));
    dateContainerClassNames.push(getClassName('feature-card__date--narrow-compact'));
  } else if (layout === FEATURE_CARD_LAYOUTS.auto) {
    outerBannerClassNames.push(getClassName('feature-card__outer-container--auto'));
  }
  if (className) classNameFinal.push(className);

  const imageContainerClassNames = [getClassName('feature-card__image-container')];

  const imageClassNames = [getClassName('feature-card__image')];
  if (disabled) {
    imageClassNames.push(getClassName('feature-card__image--disabled'));
  }
  if (imageClassName) {
    imageClassNames.push(imageClassName);
  }

  const backgroundImageClassNames = [getClassName('feature-card__background')];
  if (backgroundImageClassName) {
    backgroundImageClassNames.push(backgroundImageClassName);
  }

  const cardContent = (
    <div className={outerBannerClassNames.join(' ')}>
      <div className={dateContainerClassNames.join(' ')}>
        {annotations && annotations.map && (
          <>
            <Subsection
              className={getClassName('feature-card__annotation', 'feature-card__annotation--mobile')}
              disabled={disabled}
              hover={hovering && !disabled}
              anchor={false}
              noPadding
              link
              name={annotations.join(' ')}
            />
            {annotations.map(annotation => (
              <Subsection
                className={getClassName('feature-card__annotation', 'feature-card__annotation--tablet')}
                key={annotation}
                disabled={disabled}
                hover={hovering && !disabled}
                anchor={false}
                noPadding
                link
                name={annotation}
              />
            ))}
          </>
        )}
      </div>
      <div className={centerClassNames.join(' ')}>
        <Section
          noPadding
          disabled={disabled}
          hover={hovering && !disabled}
          name={title}
          link={!disabled}
          className={getClassName('feature-card__title')}
        />
        {children && <div className={getClassName('feature-card__children')}>{children}</div>}
      </div>
      {imageSrc && (
        <div
          className={imageContainerClassNames.join(' ')}
          style={{
            border: imageBorder ? `solid ${imageBorder} 0.1rem` : 'none',
          }}>
          <Image
            className={imageClassNames.join(' ')}
            aspectX={1}
            aspectY={1}
            imgProps={{
              alt: 'card',
            }}
            lightSrc={imageSrc}
            darkSrc={imageSrc}
          />
        </div>
      )}
    </div>
  );

  return (
    <Card
      className={classNameFinal.join(' ')}
      disabled={disabled}
      onHoverChanged={setHovering}
      backgroundImageClassName={backgroundImageClassName}
      ref={ref}
      {...rest}>
      {cardContent}
    </Card>
  );
});

FeatureCard.propTypes = {
  ariaLabel: PropTypes.string,
  backgroundImageClassName: PropTypes.string,
  bannerColor: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  annotations: PropTypes.arrayOf(PropTypes.string),
  disabled: PropTypes.bool,
  fillImageSrc: PropTypes.node,
  href: PropTypes.string,
  imageBorder: PropTypes.string,
  imageClassName: PropTypes.string,
  imageSrc: PropTypes.node,
  layout: PropTypes.string,
  onClick: PropTypes.func,
  title: PropTypes.string,
};

FeatureCard.defaultProps = {
  ariaLabel: null,
  backgroundImageClassName: null,
  bannerColor: null,
  children: null,
  className: null,
  annotations: null,
  disabled: false,
  fillImageSrc: null,
  href: null,
  imageBorder: null,
  imageClassName: null,
  imageSrc: null,
  layout: FEATURE_CARD_LAYOUTS.auto,
  onClick: null,
  title: null,
};

export default FeatureCard;
