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
  const { className, children, ...rest } = props;
  const outerClassNameFinal = [];
  if (className) { outerClassNameFinal(className); }

  return (
    <div className={outerClassNameFinal.join(' ')} {...rest} >
      <div className={getClassName('get-social__container')} style={{ paddingBottom: '0.4rem' }}>
        <a className={getClassName('get-social__link')} href="https://github.com/georgegillams/" rel="noopener noreferrer" target="_blank">
          <img alt="github" width={5} height={5} className={getClassName('get-social__icon')} src={githubIcon} />
        </a>
        {/* <a className={getClassName('get-social__link')} href="https://github.com/Skyscanner" rel="noopener noreferrer" target="_blank">
      <img alt="Skyscanner" width={5} height={5} className={getClassName('get-social__icon')} src={skyscannerIcon} />
      </a> */}
        <a className={getClassName('get-social__link')} href="https://www.facebook.com/george333123" rel="noopener noreferrer" target="_blank">
          <img alt="facebook" width={5} height={5} className={getClassName('get-social__icon')} src={facebookIcon} />
        </a>
        <a className={getClassName('get-social__link')} href="https://www.linkedin.com/in/george-gillams-37537077" rel="noopener noreferrer" target="_blank">
          <img alt="linkedin" width={5} height={5} className={getClassName('get-social__icon')} src={linkedinIcon} />
        </a>
        <a className={getClassName('get-social__link')} href="https://www.flickr.com/people/137198167@N03/" rel="noopener noreferrer" target="_blank">
          <img alt="flickr" width={5} height={5} className={getClassName('get-social__icon')} src={flickrIcon} />
        </a>
      </div>
      <div className={getClassName('get-social__container')} >
        <a className={getClassName('get-social__link')} href="https://www.dropbox.com/request/Xin5hG6X6zX2z94VLJJm" rel="noopener noreferrer" target="_blank">
          <img alt="dropbox" width={5} height={5} className={getClassName('get-social__icon')} src={dropboxIcon} />
        </a>
        <a className={getClassName('get-social__link')} href="mailto:g@georgegillams.co.uk" rel="noopener noreferrer" target="_blank">
          <img alt="email" width={5} height={5} className={getClassName('get-social__icon')} src={emailIcon} />
        </a>
        <a className={getClassName('get-social__link')} href="tel:+447867592615" rel="noopener noreferrer" target="_blank">
          <img alt="phone" width={5} height={5} className={getClassName('get-social__icon')} src={phoneIcon} />
        </a>
      </div>
      <div className={getClassName('get-social__container')} style={{ paddingTop: '1rem' }}>
        {children}
      </div>
    </div>
  );
};

GetSocial.propTypes = {
  className: PropTypes.string,
};

GetSocial.defaultProps = {
  className: null,
};

export default GetSocial;
