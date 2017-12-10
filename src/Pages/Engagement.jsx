import React from 'react';
import PropTypes from 'prop-types';
import BpkText from 'bpk-component-text';
import BpkImage, { withLazyLoading, withLoadingBehavior } from 'bpk-component-image';
import Section from './../components/Section';
import SubSection from './../components/SubSection';
import humans from './images/humans.jpg';

// import STYLES from '../pages.scss';
//
// const getClassName = className => STYLES[className] || 'UNKNOWN';
const documentIfExists = typeof window !== 'undefined' ? document : null;
const FadingLazyLoadedImage = withLoadingBehavior(withLazyLoading(BpkImage, documentIfExists));

/* eslint-disable max-len */
const Engagement = (props) => {
  const { className, ...rest } = props;
  const classNameFinal = [];
  if (className) { classNameFinal.push(className); }

  return (
    <main className={classNameFinal.join(' ')} {...rest} >
      <Section name="We're engaged!">
        We just wanted to let you all know that we&apos;ve sealed the deal! We&apos;ll set a date for the wedding soon!!!
      </Section>
      <FadingLazyLoadedImage style={{ marginTop: '2rem', width: '50%' }} altText="My humans are getting married" width={570} height={545} src={humans} />
    </main>
  );
};

Engagement.propTypes = {
  className: PropTypes.string,
};

Engagement.defaultProps = {
  className: null,
};

export default Engagement;
