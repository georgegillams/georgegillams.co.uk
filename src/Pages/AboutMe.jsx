import React from 'react';
import PropTypes from 'prop-types';
import BpkText from 'bpk-component-text';
import BpkImage, { withLazyLoading, withLoadingBehavior } from 'bpk-component-image';
import Section from './../components/Section';
import SubSection from './../components/SubSection';
import georgeAndCharlie from '../images/georgeAndCharlie.jpg';
import georgeGillams from '../images/georgegillams.jpg';

import STYLES from './pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';
const documentIfExists = typeof window !== 'undefined' ? document : null;
const FadingLazyLoadedImage = withLoadingBehavior(withLazyLoading(BpkImage, documentIfExists));

/* eslint-disable max-len */
const AboutMe = (props) => {
  const { className, ...rest } = props;
  const classNameFinal = [getClassName('pages__page')];
  if (className) { classNameFinal.push(className); }

  return (
    <main className={classNameFinal.join(' ')} {...rest} >
      <Section name="About me">
          I&apos;m an open-source software engineer, passionate about design, travel and photography. When I&apos;m not internationally photobombing unsuspecting strangers I&apos;m based somewhere between Southampton and London.
        <br />
        <br />
        I enjoy getting outdoors and trying new things, and will be completeing my 5th Tough Mudder in May 2018. I also try to squeeze in as much volunteering as I can, so you may find me dressed as a for Help for Heroes bear, reviewing content for Beat, or submitting PR's to Mozilla's open-source. I look forward to doing more of all that when I finish my Masters.
        <br />
        <br />
        {/* I recently got engaged
        <br />
        <br /> */}
        <FadingLazyLoadedImage style={{ marginBottom: '1.5rem', width: '100%' }} altText="George Gillams" width={2592} height={1944} src={georgeAndCharlie} />
      </Section>
    </main>
  );
};

AboutMe.propTypes = {
  className: PropTypes.string,
};

AboutMe.defaultProps = {
  className: null,
};

export default AboutMe;
