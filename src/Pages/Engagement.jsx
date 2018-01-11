import React from 'react';
import PropTypes from 'prop-types';
import BpkImage, { withLazyLoading, withLoadingBehavior } from 'bpk-component-image';
import Section from './../components/Section';
import SubSection from './../components/SubSection';
import SideBar from '../components/SideBar';
import tiggsAmazed from './images/tiggsAmazed.jpg';
import humans from './images/humans.jpg';
import starbucks from './images/starbucks.jpg';
import engagementRing from './images/engagementRing.jpg';
import proposal from './images/proposal.jpg';

import STYLES from './pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';
const documentIfExists = typeof window !== 'undefined' ? document : null;
const FadingLazyLoadedImage = withLoadingBehavior(withLazyLoading(BpkImage, documentIfExists));

/* eslint-disable max-len */
const Engagement = (props) => {
  const { className, ...rest } = props;
  const classNameFinal = [getClassName('pages__page')];
  if (className) { classNameFinal.push(className); }

  // TODO Add image of starbucks cups
  // TODO Add image of Iceland sceneray throught the ring
  // TODO Add image of proposal

  return (
    <SideBar>
      <main className={classNameFinal.join(' ')} {...rest} >
        <Section name="We're engaged!">
          <SubSection name="We're very pleased to announce our engagement!" >
          We&apos;ll set a date for the wedding soon!!!
          <br />
            <br />
            <FadingLazyLoadedImage className={getClassName('pages__image')} style={{ width: '50%', paddingRight: '1rem' }} altText="My humans are getting married" width={2514} height={1676} src={humans} />
            <FadingLazyLoadedImage className={getClassName('pages__image')} style={{ width: '20%' }} altText="My humans are getting married" width={2514} height={1676} src={starbucks} />
            <br />
            <FadingLazyLoadedImage className={getClassName('pages__image')} altText="My humans are getting married" width={2514} height={1676} src={engagementRing} />
            <br />
            <FadingLazyLoadedImage className={getClassName('pages__image')} altText="My humans are getting married" width={2514} height={1676} src={proposal} />
            <br />
      This was Tigg&apos;s face when we first told him!
          <br />
            <br />
            <FadingLazyLoadedImage className={getClassName('pages__image')} altText="Tigg's face when we told him!" width={2514} height={1676} src={tiggsAmazed} />
          </SubSection>
        </Section>
      </main>
    </SideBar>
  );
};

Engagement.propTypes = {
  className: PropTypes.string,
};

Engagement.defaultProps = {
  className: null,
};

export default Engagement;
