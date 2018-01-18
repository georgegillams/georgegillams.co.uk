import React from 'react';
import PropTypes from 'prop-types';
// import BpkImage, { withLazyLoading, withLoadingBehavior } from 'bpk-component-image';
import githubIcon from './../icons/github.png';
import facebookIcon from './../icons/facebook.png';
import linkedinIcon from './../icons/linkedin.png';
import flickrIcon from './../icons/flickr.png';
import emailIcon from './../icons/email.png';
import phoneIcon from './../icons/phone.png';
import dropboxIcon from './../icons/dropbox.png';

// import skyscannerIcon from './../icons/skyscanner.png';

import STYLES from './get-social.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';
// const documentIfExists = typeof window !== 'undefined' ? document : null;
// const FadingLazyLoadedImage = withLoadingBehavior(withLazyLoading(BpkImage, documentIfExists));

const GetSocial = (props) => {
  const {
    light, className, alwaysCentered, ...rest
  } = props;
  const outerClassNameFinal = [];
  if (className) { outerClassNameFinal.push(className); }

  const containerClassNameFinal = [getClassName('get-social__container')];
  const iconClassNameFinal = [getClassName('get-social__icon')];
  const darkIconClassNameFinal = [getClassName('get-social__icon')];

  if (alwaysCentered) { containerClassNameFinal.push(getClassName('get-social__container--centered')); }

  if (light) {
    darkIconClassNameFinal.push(getClassName('get-social__icon--light-inverted'));
    iconClassNameFinal.push(getClassName('get-social__icon--light'));
  } else {
    darkIconClassNameFinal.push(getClassName('get-social__icon--no-light'));
    iconClassNameFinal.push(getClassName('get-social__icon--no-light'));
  }

  return (
    <div className={outerClassNameFinal.join(' ')} {...rest} >
      <div className={containerClassNameFinal.join(' ')} style={{ paddingBottom: '0.4rem' }}>
        <a href="https://github.com/georgegillams/" rel="noopener noreferrer" target="_blank">
          <img alt="github" width={5} height={5} className={darkIconClassNameFinal.join(' ')} src={githubIcon} />
        </a>
        {/* <a  href="https://github.com/Skyscanner" rel="noopener noreferrer" target="_blank">
      <img alt="Skyscanner" width={5} height={5} className={iconClassNameFinal.join(' ')} src={skyscannerIcon} />
      </a> */}
        <a href="https://www.facebook.com/george333123" rel="noopener noreferrer" target="_blank">
          <img alt="facebook" width={5} height={5} className={iconClassNameFinal.join(' ')} src={facebookIcon} />
        </a>
        <a href="https://www.linkedin.com/in/george-gillams-37537077" rel="noopener noreferrer" target="_blank">
          <img alt="linkedin" width={5} height={5} className={iconClassNameFinal.join(' ')} src={linkedinIcon} />
        </a>
        <a href="https://www.flickr.com/people/137198167@N03/" rel="noopener noreferrer" target="_blank">
          <img alt="flickr" width={5} height={5} className={iconClassNameFinal.join(' ')} src={flickrIcon} />
        </a>
        <a href="https://www.dropbox.com/request/Xin5hG6X6zX2z94VLJJm" rel="noopener noreferrer" target="_blank">
          <img alt="dropbox" width={5} height={5} className={iconClassNameFinal.join(' ')} src={dropboxIcon} />
        </a>
        <a href="mailto:g@georgegillams.co.uk" rel="noopener noreferrer" target="_blank">
          <img alt="email" width={5} height={5} className={darkIconClassNameFinal.join(' ')} src={emailIcon} />
        </a>
        <a href="tel:+447867592615" rel="noopener noreferrer" target="_blank">
          <img alt="phone" width={5} height={5} className={darkIconClassNameFinal.join(' ')} src={phoneIcon} />
        </a>
      </div>
    </div>
  );
};

GetSocial.propTypes = {
  light: PropTypes.bool,
  className: PropTypes.string,
  alwaysCentered: PropTypes.bool,
};

GetSocial.defaultProps = {
  light: false,
  className: null,
  alwaysCentered: false,
};

export default GetSocial;
