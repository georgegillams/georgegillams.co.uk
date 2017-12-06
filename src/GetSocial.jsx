import React from 'react';
import githubIcon from './icons/github.png';
import facebookIcon from './icons/facebook.png';
import linkedinIcon from './icons/linkedin.png';
import flickrIcon from './icons/flickr.png';

import STYLES from './get-social.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const GetSocial = () => (
  <div className={getClassName('get-social__container')}>
    <a className={getClassName('get-social__link')} href="https://github.com/georgegillams/" rel="noopener noreferrer" target="_blank">
      <img alt="github" className={getClassName('get-social__icon')} src={githubIcon} />
    </a>
    <a className={getClassName('get-social__link')} href="https://www.facebook.com/george333123" rel="noopener noreferrer" target="_blank">
      <img alt="facebook" className={getClassName('get-social__icon')} src={facebookIcon} />
    </a>
    <a className={getClassName('get-social__link')} href="https://www.linkedin.com/in/george-gillams-37537077" rel="noopener noreferrer" target="_blank">
      <img alt="linkedin" className={getClassName('get-social__icon')} src={linkedinIcon} />
    </a>
    <a className={getClassName('get-social__link')} href="https://www.flickr.com/people/137198167@N03/" rel="noopener noreferrer" target="_blank">
      <img alt="flickr" className={getClassName('get-social__icon')} src={flickrIcon} />
    </a>
  </div>
);

export default GetSocial;
