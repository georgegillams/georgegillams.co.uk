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
// import * as TOKENS from 'bpk-tokens/tokens/ios/base.react.native.es6';
import BpkHorizontalNav, { BpkHorizontalNavItem } from 'bpk-component-horizontal-nav';

import STYLES from './App.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';
const AlignedBpkSmallDownloadIcon = alignToButton(BpkSmallDownloadIcon);
const AlignedBpkSmallUpgradeIcon = alignToButton(BpkSmallUpgradeIcon);

const ComingSoon = (props) => {

  return (
      <div>
      <div className={getClassName('App__background-duck')}>
    </div>
    <BpkText tagName="h2" textStyle="xxl" className={getClassName('App__big-picture-text')}>Coming Soon...</BpkText>
  </div>
  );
};

// ComingSoon.propTypes = {
//   // serialPortPath: PropTypes.string.isRequired,
// };

export default ComingSoon;
