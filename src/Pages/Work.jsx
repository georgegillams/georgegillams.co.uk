import React from 'react';
import PropTypes from 'prop-types';
import BpkText from 'bpk-component-text';
import BpkImage, { withLazyLoading, withLoadingBehavior } from 'bpk-component-image';
import Section from '../components/Section';
import SubSection from '../components/SubSection';

// import STYLES from '../pages.scss';
//
// const getClassName = className => STYLES[className] || 'UNKNOWN';
const documentIfExists = typeof window !== 'undefined' ? document : null;
const FadingLazyLoadedImage = withLoadingBehavior(withLazyLoading(BpkImage, documentIfExists));

/* eslint-disable max-len */
const Work = (props) => {
  const { className, ...rest } = props;
  const classNameFinal = [];
  if (className) { classNameFinal.push(className); }

  return (
    <main className={classNameFinal.join(' ')} {...rest} >
      <Section name="My Work">
        <SubSection name="Where it started">
              I started my Software Engineering career at Leonardo where I worked for 60 weeks, mainly on a .NET analysis framework which supported other development teams in building powerful applications.
        <br />
          <br />
        I then moved on to become a Software Engineering intern at Skyscanner, where I worked on their open-source design system. I continued this work whilst completing my Masters in Southampton. Once my Masters was out of the way, Ire-joined as a full-time employee.
        </SubSection>
        <SubSection name="Portfolio">
              This web-site demonstrates some of my web-development capabilities. Below I have included examples and extracts from my work on open-source products.
        </SubSection>
      </Section>
    </main>
  );
};

Work.propTypes = {
  className: PropTypes.string,
};

Work.defaultProps = {
  className: null,
};

export default Work;
