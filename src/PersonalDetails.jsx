import React from 'react';
import BpkText from 'bpk-component-text';
import GetSocial from './GetSocial';

import STYLES from './personal-details.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const ProfilePic = () => (
  <div className={getClassName('personal-details__container')}>
    <div className={getClassName('personal-details__section')}>
      <a className={getClassName('personal-details__link')} href="/">
        <BpkText tagName="h1" textStyle="xl">George Gillams</BpkText>
      </a>
      <BpkText tagName="h3" textStyle="base">Open-source Software Engineer</BpkText>
    </div>
    <div className={getClassName('personal-details__section')}>
      <GetSocial />
    </div>
    <div className={getClassName('personal-details__section')}>
      <BpkText tagName="h3" textStyle="base">v_1.0.0</BpkText>
    </div>
  </div>
);

export default ProfilePic;
