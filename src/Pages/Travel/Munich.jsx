import React from 'react';
import PropTypes from 'prop-types';
import BpkText from 'bpk-component-text';
import BpkImage, { withLazyLoading, withLoadingBehavior } from 'bpk-component-image';
import Section from './../../components/Section';
import SubSection from './../../components/SubSection';
import netflixDownloads from './../../images/netflixDownloads.png';
import ArticleDate from '../../components/ArticleDate';
import philMunich from './images/munichPhil.jpg';

import STYLES from '../pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';
const documentIfExists = typeof window !== 'undefined' ? document : null;
const FadingLazyLoadedImage = withLoadingBehavior(withLazyLoading(BpkImage, documentIfExists));
const dateWritten = new Date(2017, 11, 8, 7, 1, 0);

/* eslint-disable max-len */
const Munich = (props) => {
  const { className, ...rest } = props;
  const classNameFinal = [getClassName('pages__page')];
  if (className) { classNameFinal.push(className); }

  return (
    <main className={classNameFinal.join(' ')} {...rest} >
      <Section name="Munich - Christmas 2017" >
        <a className={getClassName('pages__link')} href="https://flic.kr/s/aHsm9VxHMV" rel="noopener noreferrer" target="_blank">
          <SubSection name="Click here to see the full album on Flickr" />
        </a>
        <FadingLazyLoadedImage style={{ marginBottom: '1.5rem', width: '100%' }} altText="My brother up a tree" width={2514} height={1676} src={philMunich} />
      </Section>
    </main>
  );
};

Munich.propTypes = {
  className: PropTypes.string,
};

Munich.defaultProps = {
  className: null,
};

export default Munich;
