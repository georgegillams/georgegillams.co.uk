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
  const { className, ...rest } = props;
  const classNameFinal = [getClassName('logo__container')];
  if (className) { classNameFinal.push(className); }

  return (
    <div className={classNameFinal.join(' ')} {...rest} >
      <a href="/">
        <BpkText textStyle="xxl" className={getClassName('logo__logo--large')} >
          {'<G/>'}
        </BpkText>
        <br />
      </a>
      <a href="/">
        <br />
        <BpkText textStyle="lg" className={getClassName('logo__logo--base')} >
          {'George Gillams'}
        </BpkText>
      </a>
    </div>
  );
};

ProfilePic.propTypes = {
  className: PropTypes.string,
};

ProfilePic.defaultProps = {
  className: null,
};

export default ProfilePic;
