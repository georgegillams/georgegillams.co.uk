import React from 'react';
import PropTypes from 'prop-types';
import BpkText from 'bpk-component-text';
import BpkImage, { withLazyLoading, withLoadingBehavior } from 'bpk-component-image';
import Section from './../components/Section';
import SubSection from './../components/SubSection';
import georgeAndCharlie from '../images/georgeAndCharlie2.jpg';
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
          I&apos;m an open-source software engineer at Skyscanner, passionate about design, travel and photography. When I&apos;m not internationally photobombing unsuspecting strangers I&apos;m based somewhere between Southampton and London.
        <br />
        <br />
        I recently got engaged whilst whale-watching in Iceland 💍 (see below)!
        <br />
        <br />
        I enjoy getting outdoors and trying new things, and will be completeing my 5th Tough Mudder in May 2018. I also try to squeeze in as much volunteering as I can, so you may find me dressed as a Help for Heroes bear, reviewing content for Beat, or submitting PR's to Mozilla's open-source. I look forward to doing more of all that when I finish my Masters.
        <br />
        <br />
        {/* <SubSection name="Achievements">
            I&apos;m not usually one to blow my own trumpet, but recent achievements of note include my Masters in Software Engineering and Grade 8 on the flute.
        <FadingLazyLoadedImage className={getClassName('pages__image')} altText="George Gillams Degree" width={2592} height={1944} src={georgeDegree} />
        <FadingLazyLoadedImage className={getClassName('pages__image')} altText="George Gillams Grade 8 Certificate" width={2592} height={1944} src={georgeFlute} />
        </SubSection> */}
        {/* I recently got engaged
        <br />
        <br /> */}
        <FadingLazyLoadedImage className={getClassName('pages__image')} altText="George Gillams" width={1674} height={1116} src={georgeAndCharlie} />
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
