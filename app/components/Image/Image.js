import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'gg-components/helpers/cssModules';
import BpkImage, {
  withLazyLoading,
  withLoadingBehavior,
} from 'bpk-component-image';

import STYLES from './image.scss';

const getClassName = cssModules(STYLES);

const documentIfExists = typeof window !== 'undefined' ? document : null;
const FadingLazyLoadedImage = withLoadingBehavior(
  withLazyLoading(BpkImage, documentIfExists),
);

const Image = props => {
  const { className, lightSrc, darkSrc, ...rest } = props;

  return (
    <Fragment>
      <FadingLazyLoadedImage
        className={getClassName(`image`, 'image--light', className)}
        src={lightSrc}
        {...rest}
      />
      <FadingLazyLoadedImage
        className={getClassName(`image`, 'image--dark', className)}
        src={darkSrc}
        {...rest}
      />
    </Fragment>
  );
};

Image.propTypes = {
  className: PropTypes.string,
  darkSrc: PropTypes.string.isRequired,
  lightSrc: PropTypes.string.isRequired,
};

Image.defaultProps = {
  className: null,
};

export default Image;
