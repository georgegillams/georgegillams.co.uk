import PropTypes from 'prop-types';
import React from 'react';
import { BpkCode, BpkCodeBlock } from 'bpk-component-code';
import BpkInput from 'bpk-component-input';
import BpkButton from 'bpk-component-button';
import BpkText from 'bpk-component-text';
import AnimateHeight from 'bpk-animate-height';
import BpkBannerAlert, { ALERT_TYPES } from 'bpk-component-banner-alert';
import BpkCheckBox from 'bpk-component-checkbox';
import ReactFileReader from 'react-file-reader';
import { colors } from 'bpk-tokens/tokens/base.es6';
import { alignToButton } from 'bpk-component-icon';
import BpkSmallDownloadIcon from 'bpk-component-icon/sm/download';
import BpkSmallUpgradeIcon from 'bpk-component-icon/sm/upgrade';
import BpkImage from 'bpk-component-image';
// import * as TOKENS from 'bpk-tokens/tokens/ios/base.react.native.es6';
import BpkHorizontalNav, { BpkHorizontalNavItem } from 'bpk-component-horizontal-nav';
import { BpkGridContainer, BpkGridRow, BpkGridColumn } from 'bpk-component-grid';
import Section from './Section';
import SubSection from './SubSection';
import githubIcon from './icons/github.png';
import facebookIcon from './icons/facebook.png';
import linkedinIcon from './icons/linkedin.png';
import flickrIcon from './icons/flickr.png';

import STYLES from './get-social.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';
const AlignedBpkSmallDownloadIcon = alignToButton(BpkSmallDownloadIcon);
const AlignedBpkSmallUpgradeIcon = alignToButton(BpkSmallUpgradeIcon);

const GetSocial = props => (
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

// GetSocial.propTypes = {
//   // serialPortPath: PropTypes.string.isRequired,
// };

export default GetSocial;
