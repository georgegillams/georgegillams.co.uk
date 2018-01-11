import React from 'react';
import PropTypes from 'prop-types';
import BpkImage, { withLazyLoading, withLoadingBehavior } from 'bpk-component-image';
import Section from './../../components/Section';
import SubSection from './../../components/SubSection';
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
        <SubSection name="Have I photobombed you? Send me the goods →" />
        <FadingLazyLoadedImage className={getClassName('pages__image')} altText="Seal photobombing" width={800} height={584} src={sealPhotobomb} />
      </a>
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
