import React from 'react';
import PropTypes from 'prop-types';
import BpkText from 'bpk-component-text';
import BpkImage, { withLazyLoading, withLoadingBehavior } from 'bpk-component-image';
import Section from './../../components/Section';
import SubSection from './../../components/SubSection';
import netflixDownloads from './../../images/netflixDownloads.png';
import ArticleDate from '../../components/ArticleDate';
import sealPhotobomb from './images/sealPhotobomb.jpg';

import STYLES from '../pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';
const documentIfExists = typeof window !== 'undefined' ? document : null;
const FadingLazyLoadedImage = withLoadingBehavior(withLazyLoading(BpkImage, documentIfExists));
const dateWritten = new Date(2017, 11, 8, 7, 1, 0);

/* eslint-disable max-len */
const Photobombing = (props) => {
  const { className, ...rest } = props;
  const classNameFinal = [getClassName('pages__page')];
  if (className) { classNameFinal.push(className); }

  return (
    <main className={classNameFinal.join(' ')} {...rest} >
      <Section name="Photobombing" />
      <a className={getClassName('pages__link')} href="https://www.dropbox.com/request/erdfWZ3zPHy5sOYmcrY8" rel="noopener noreferrer" target="_blank">
        <SubSection name="Have I photobombed you? Click here to send me the goods!" />
      </a>
      <FadingLazyLoadedImage style={{ marginBottom: '1.5rem', width: '100%' }} altText="Seal photobombing" width={800} height={584} src={sealPhotobomb} />
    </main>
  );
};

Photobombing.propTypes = {
  className: PropTypes.string,
};

Photobombing.defaultProps = {
  className: null,
};

export default Photobombing;
