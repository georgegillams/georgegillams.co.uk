import React from 'react';
import PropTypes from 'prop-types';
import BpkText from 'bpk-component-text';
import BpkImage, { withLazyLoading, withLoadingBehavior } from 'bpk-component-image';
import Section from './../../components/Section';
import SubSection from './../../components/SubSection';
import netflixDownloads from './../../images/netflixDownloads.png';
import ArticleDate from '../../components/ArticleDate';

import STYLES from '../pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';
const documentIfExists = typeof window !== 'undefined' ? document : null;
const FadingLazyLoadedImage = withLoadingBehavior(withLazyLoading(BpkImage, documentIfExists));
const dateWritten = new Date(2017, 11, 8, 7, 1, 0);

/* eslint-disable max-len */
const NetNeutrality = (props) => {
  const { className, ...rest } = props;
  const classNameFinal = [];
  if (className) { classNameFinal.push(className); }

  return (
    <main className={classNameFinal.join(' ')} {...rest} >
      <a className={getClassName('pages__link')} href="https://flic.kr/s/aHsm9VxHMV">
        <Section name="Click here to see the full album on Flickr" />
      </a>
    </main>
  );
};

NetNeutrality.propTypes = {
  className: PropTypes.string,
};

NetNeutrality.defaultProps = {
  className: null,
};

export default NetNeutrality;
