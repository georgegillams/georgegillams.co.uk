import React from 'react';
import PropTypes from 'prop-types';
import BpkText from 'bpk-component-text';
import BpkImage, { withLazyLoading, withLoadingBehavior } from 'bpk-component-image';
import logo from './../images/logo.svg';

import STYLES from './logo.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';
const documentIfExists = typeof window !== 'undefined' ? document : null;
const FadingLazyLoadedImage = withLoadingBehavior(withLazyLoading(BpkImage, documentIfExists));

const ProfilePic = (props) => {
  const {
    small, className, alwaysCentered, light, ...rest
  } = props;
  const classNameFinal = [getClassName('logo__container')];
  if (className) { classNameFinal.push(className); }
  if (alwaysCentered) { classNameFinal.push(getClassName('logo__container--centered')); }

  const baseTextClassNameFinal = [getClassName('logo__logo-base')];
  if (light) { baseTextClassNameFinal.push(getClassName('logo__logo-base--light')); }

  const largeTextClassNameFinal = [getClassName('logo__logo-large')];
  if (small) { largeTextClassNameFinal.push(getClassName('logo__logo-large--smaller')); }

  return (
    <div className={classNameFinal.join(' ')} {...rest} >
      <a href="/">
        <BpkText textStyle="xxl" className={largeTextClassNameFinal.join(' ')} >
          {'<G/>'}
        </BpkText>
        {!small &&
        <div>
          <br />
          <br />
          <BpkText textStyle="lg" className={baseTextClassNameFinal.join(' ')} >
            {'George Gillams'}
          </BpkText>
        </div>
        }
      </a>
    </div>
  );
};

ProfilePic.propTypes = {
  className: PropTypes.string,
  light: PropTypes.bool,
  alwaysCentered: PropTypes.bool,
};

ProfilePic.defaultProps = {
  className: null,
  light: false,
  alwaysCentered: false,
};

export default ProfilePic;
