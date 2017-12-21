import React from 'react';
import PropTypes from 'prop-types';
import BpkImage, { withLazyLoading, withLoadingBehavior } from 'bpk-component-image';
import georgegillams from './../images/georgegillams.jpg';

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
      <FadingLazyLoadedImage altText="george gillams" width={500} height={500} src={georgegillams} />
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
