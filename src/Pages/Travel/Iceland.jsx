import React from 'react';
import PropTypes from 'prop-types';
import BpkImage, { withLazyLoading, withLoadingBehavior } from 'bpk-component-image';
import Section from './../../components/Section';
import SubSection from './../../components/SubSection';
import iceland from './images/iceland.jpg';

import STYLES from '../pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';
const documentIfExists = typeof window !== 'undefined' ? document : null;
const FadingLazyLoadedImage = withLoadingBehavior(withLazyLoading(BpkImage, documentIfExists));

/* eslint-disable max-len */
const Iceland = (props) => {
  const { className, ...rest } = props;
  const classNameFinal = [getClassName('pages__page')];
  if (className) { classNameFinal.push(className); }

  return (
    <main className={classNameFinal.join(' ')} {...rest} >
      <Section name="Iceland - January 2018" >
        <a className={getClassName('pages__link')} href="https://flic.kr/s/aHskqS4GoZ" rel="noopener noreferrer" target="_blank">
          <SubSection name="See the full album on Flickr →" />
          <FadingLazyLoadedImage className={getClassName('pages__image')} altText="Overlooking the harbour" width={2514} height={1676} src={iceland} />
        </a>
      </Section>
    </main>
  );
};

Iceland.propTypes = {
  className: PropTypes.string,
};

Iceland.defaultProps = {
  className: null,
};

export default Iceland;
