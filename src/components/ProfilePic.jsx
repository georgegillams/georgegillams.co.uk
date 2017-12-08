import React from 'react';
import PropTypes from 'prop-types';
import georgegillams from './../images/georgegillams.jpg';

import STYLES from './profile-pic.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const ProfilePic = (props) => {
  const { className, ...rest } = props;
  const classNameFinal = [getClassName('profile-pic__container')];
  if (className) { classNameFinal.push(className); }

  return (
    <div className={classNameFinal.join(' ')} {...rest} >
      <div className={getClassName('profile-pic__image')} style={{ backgroundImage: `url(${georgegillams})` }} />
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
