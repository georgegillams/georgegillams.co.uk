import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import BpkImage, {
  withLazyLoading,
  withLoadingBehavior,
} from 'bpk-component-image';
import Section from './Section';
import SubSection from './SubSection';

import STYLES from './article-card.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const documentIfExists = typeof window !== 'undefined' ? document : null;
const FadingLazyLoadedImage = withLoadingBehavior(
  withLazyLoading(BpkImage, documentIfExists),
);

class ArticleCard extends Component {
  constructor(props) {
    super(props);

    this.state = { hovering: false };
  }

  render() {
    const {
      day,
      month,
      imageBorder,
      bannerColor,
      fillImageSrc,
      light,
      linkUrl,
      imageSrc,
      title,
      className,
      backgroundImageClassName,
      imageClassName,
      fixedWidth,
      children,
      ...rest
    } = this.props;

    const classNameFinal = [getClassName('article-card__outer-container')];
    if (className) classNameFinal.push(className);

    const bannerClassNames = [getClassName('article-card__banner')];
    if (light) {
      bannerClassNames.push(getClassName('article-card__banner--light'));
    }
    if (this.state.hovering) {
      bannerClassNames.push(getClassName('article-card__banner--hovered'));
    }
    const innerBannerClassNames = [
      getClassName('article-card__inner-container'),
    ];
    if (fixedWidth) {
      innerBannerClassNames.push(
        getClassName('article-card__inner-container--fixed-width'),
      );
    }
    const contentContainerClassNames = [
      getClassName('article-card__content-container'),
    ];
    if (fixedWidth) {
      contentContainerClassNames.push(
        getClassName('article-card__content-container--fixed-width'),
      );
    }

    const imageContainerClassNames = [
      getClassName('article-card__image-container'),
    ];

    const imageClassNames = [getClassName('article-card__image')];
    if (imageClassName) {
      imageClassNames.push(imageClassName);
    }

    const backgroundImageClassNames = [
      getClassName('article-card__background'),
    ];
    if (light) {
      backgroundImageClassNames.push(
        getClassName('article-card__background--light'),
      );
    }
    if (backgroundImageClassName) {
      backgroundImageClassNames.push(backgroundImageClassName);
    }

    return (
      <NavLink
        to={linkUrl}
        className={classNameFinal.join(' ')}
        {...rest}
        onMouseEnter={() => this.setState({ hovering: true })}
        onMouseLeave={() => this.setState({ hovering: false })}
      >
        <div className={contentContainerClassNames.join(' ')}>
          <div
            className={backgroundImageClassNames.join(' ')}
            style={{ backgroundImage: `url(${fillImageSrc})` }}
          />
          <div className={innerBannerClassNames.join(' ')}>
            <div className={getClassName('article-card__date')}>
              <SubSection
                hover={this.state.hovering}
                noAnchor
                noPadding
                link
                light={light}
                name={month}
              />
              <SubSection
                hover={this.state.hovering}
                noAnchor
                noPadding
                link
                light={light}
                name={day}
              />
            </div>
            <Section
              hover={this.state.hovering}
              light={light}
              name={title}
              link
              className={getClassName('article-card__title')}
            />
            <div className={getClassName('article-card__children')}>
              {children}
            </div>
            <div
              className={imageContainerClassNames.join(' ')}
              style={{
                border: imageBorder ? `solid ${imageBorder} 0.1rem` : 'none',
              }}
            >
              <FadingLazyLoadedImage
                className={imageClassNames.join(' ')}
                altText="Card image"
                width={987}
                height={575}
                src={imageSrc}
              />
            </div>
          </div>
          <div
            className={bannerClassNames.join(' ')}
            style={bannerColor ? { backgroundColor: bannerColor } : {}}
          />
        </div>
      </NavLink>
    );
  }
}

ArticleCard.propTypes = {
  light: PropTypes.bool,
  bannerColor: PropTypes.string,
  imageBorder: PropTypes.bool,
  fillImageSrc: PropTypes.node,
  imageSrc: PropTypes.node,
  linkUrl: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string,
};

ArticleCard.defaultProps = {
  light: false,
  bannerColor: null,
  imageBorder: null,
  linkUrl: null,
  fillImageSrc: null,
  imageSrc: null,
  title: null,
  className: null,
};

export default ArticleCard;
