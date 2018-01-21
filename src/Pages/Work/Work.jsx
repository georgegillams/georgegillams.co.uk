import React from 'react';
import PropTypes from 'prop-types';
import BpkImage, { withLazyLoading, withLoadingBehavior } from 'bpk-component-image';
import Section from '../../components/Section';
import TextLink from '../../components/TextLink';
import Button from '../../components/Button';
import SubSection from '../../components/SubSection';
import passwordCharacterExtractorUse from './images/passwordCharacterExtractorUse.png';

import STYLES from './apps.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';
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
        <SubSection name="Where it all started">
              I started my Software Engineering career at <TextLink href="http://www.leonardocompany.com/en/-/ewos-electronic_warfare_operational_support" external>Leonardo</TextLink> where I worked for 60 weeks, mainly on a .NET analysis framework which supported other development teams in building powerful applications.
        <br />
          <br />
        I then moved on to become a Software Engineering intern at Skyscanner, where I worked on their open-source design system, <TextLink href="https://backpack.github.io/" external>Backpack</TextLink>. I continued this work whilst completing my Masters in Southampton. Once my Masters is out of the way, I will be rejoining Skyscanner as a full-time employee.
        </SubSection>
        <br />
        <Section name="Portfolio">
              This website demonstrates some of my web-development capabilities. Below I have included examples and extracts from my work on open-source products.
              <br />
          <br />
          <SubSection name="Password Character Extractor">
                I found the login process for a number of sites (particularly UK bank websites) frustrating as they often require specific characters from a password or memorable word. This is something that LastPass cannot handle for me, so I created an offline tool to help.
            <br />
            <br />
            <FadingLazyLoadedImage
              className={getClassName('apps__image')}
              altText="Password Character Extraction Use"
              style={{ width: '45rem' }}
              width={2224}
              height={514}
              src={passwordCharacterExtractorUse}
            />
            <br />
            <br />
            <Button onClick={() => window.location.replace('/apps/password-character-extractor')}>Read more here →</Button>
          </SubSection>
        </Section>
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
