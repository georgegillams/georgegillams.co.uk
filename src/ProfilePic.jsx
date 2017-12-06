import React from 'react';
import georgegillams from './images/georgegillams.jpg';

import STYLES from './profile-pic.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const ProfilePic = () => (
  <div className={getClassName('profile-pic__container')} >
    <div className={getClassName('profile-pic__image')} style={{ backgroundImage: `url(${georgegillams})` }} />
  </div>
);

export default ProfilePic;
