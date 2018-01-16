import React from 'react';
import PropTypes from 'prop-types';
import BpkImage, { withLazyLoading, withLoadingBehavior } from 'bpk-component-image';
import logo from './../images/logo.svg';

import STYLES from './profile-pic.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';
const documentIfExists = typeof window !== 'undefined' ? document : null;
const FadingLazyLoadedImage = withLoadingBehavior(withLazyLoading(BpkImage, documentIfExists));

const ProfilePic = (props) => {
  const { className, ...rest } = props;

  const classNameFinal = [getClassName('profile-pic__container')];
  if (className) { classNameFinal.push(className); }

  return (
    <div className={classNameFinal.join(' ')} {...rest} >
      <a className={getClassName('personal-details__link')} href="/">
        <FadingLazyLoadedImage style={{ width: '100%' }} altText="George Gillams" width={500} height={500} src={logo} />
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
