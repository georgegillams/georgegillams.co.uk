/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { cssModules } from '../helpers/cssModules';
import Skeleton from '../Skeletons/Skeleton';

import STYLES from './image.module.scss';

const getClassName = cssModules(STYLES);

const ImageDumb = props => {
  const {
    aspectX,
    aspectY,
    hidden,
    lightSrc,
    darkSrc,
    renderImg,
    onImageLoad,
    className,
    imgProps,
    isServer,
    ...rest
  } = props;
  const { className: imgClassName, ...imgPropsRest } = imgProps;

  const [transitioning, setTransitioning] = useState(false);

  const [renderSkeleton, setRenderSkeleton] = useState(hidden);
  const [showImage, setShowImage] = useState(!hidden);
  const [showSkeleton, setShowSkeleton] = useState(hidden);

  const [lightImageLoaded, setLightImageLoaded] = useState(false);
  const [darkImageLoaded, setDarkImageLoaded] = useState(false);

  useEffect(() => {
    if (transitioning) {
      return;
    }
    if (!hidden && !showImage) {
      setTransitioning(true);
      setShowImage(true);
      setTimeout(() => {
        setShowSkeleton(false);
        setTimeout(() => {
          setRenderSkeleton(false);
          setTransitioning(false);
        }, 400);
      }, 400);
    }
    if (hidden && showImage) {
      setTransitioning(true);
      setShowSkeleton(true);
      setRenderSkeleton(true);
      setTimeout(() => {
        setShowImage(false);
        setTransitioning(false);
      }, 400);
    }
  }, [hidden, transitioning]);

  useEffect(() => {
    if (lightImageLoaded && darkImageLoaded && onImageLoad) {
      onImageLoad();
    }
  }, [lightImageLoaded, darkImageLoaded]);

  const onLightImageLoad = () => {
    setLightImageLoaded(true);
  };

  const onDarkImageLoad = () => {
    setDarkImageLoaded(true);
  };

  const imgClassNames = [getClassName('image__img')];
  const skeletonClassNames = [getClassName('image__skeleton')];

  if (!isServer && !showImage) {
    imgClassNames.push(getClassName('image__img--hidden'));
  }
  if (!showSkeleton) {
    skeletonClassNames.push(getClassName('image__skeleton--hidden'));
  }
  const lightImgClassNames = [...imgClassNames, getClassName('image__img--light')];
  const darkImgClassNames = [...imgClassNames, getClassName('image__img--dark')];
  if (imgClassName) {
    darkImgClassNames.push(imgClassName);
    lightImgClassNames.push(imgClassName);
  }

  const aspectRatio = (100 * aspectY) / aspectX;

  return (
    <div className={getClassName('image__outer', className)} {...rest}>
      <div className={getClassName('image__placeholder')} style={{ paddingBottom: `${aspectRatio}%` }}>
        {/* Note we use completely separate elements on server vs client
        to avoid the React tree becomming poluted when it's rehydrated */}
        {!isServer && renderSkeleton && (
          <div className={getClassName('image__spinner-container')}>
            <Skeleton className={skeletonClassNames.join(' ')} />
          </div>
        )}
        {isServer && (
          <>
            <img className={lightImgClassNames.join(' ')} src={lightSrc} {...imgPropsRest} />
            <img className={darkImgClassNames.join(' ')} src={darkSrc} {...imgPropsRest} />
          </>
        )}
        {!isServer && renderImg && (
          <>
            <img className={lightImgClassNames.join(' ')} onLoad={onLightImageLoad} src={lightSrc} {...imgPropsRest} />
            <img className={darkImgClassNames.join(' ')} onLoad={onDarkImageLoad} src={darkSrc} {...imgPropsRest} />
          </>
        )}
      </div>
    </div>
  );
};

ImageDumb.propTypes = {
  aspectX: PropTypes.number.isRequired,
  aspectY: PropTypes.number.isRequired,
  hidden: PropTypes.bool,
  renderImg: PropTypes.bool,
  onImageLoad: PropTypes.func,
  className: PropTypes.string,
  lightSrc: PropTypes.string.isRequired,
  darkSrc: PropTypes.string.isRequired,
  imgProps: PropTypes.shape({
    alt: PropTypes.string.isRequired,
    className: PropTypes.string,
  }),
  isServer: PropTypes.bool,
};

ImageDumb.defaultProps = {
  hidden: false,
  renderImg: true,
  onImageLoad: null,
  className: null,
  imgProps: {},
  isServer: false,
};

export default ImageDumb;
