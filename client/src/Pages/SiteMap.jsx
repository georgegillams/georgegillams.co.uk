import React from 'react';
import TextLink from '../components/TextLink';
import SubSection from '../components/SubSection';

import STYLES from './pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const SiteMap = () => (
  <div>
    <SubSection
      noAnchor
      className={getClassName('pages__site-map-item')}
      name="Blog 📝"
    >
      <TextLink href="/blog/react-http-response-codes">
        HTTP Reponse Codes in React
      </TextLink>
      <br />
      <TextLink href="/blog/week-of-rust">My Week of Rust</TextLink>
      <br />
      <TextLink href="/blog/tough-mudder">Running 5 Tough Mudders</TextLink>
      <br />
      <TextLink href="/blog/uk-bank-security">UK Bank Security</TextLink>
      <br />
      <TextLink href="/blog/vim">Switching to Vim</TextLink>
      <br />
      <TextLink href="/blog/net-neutrality">My Take on Net Neutrality</TextLink>
    </SubSection>
    <SubSection
      noAnchor
      className={getClassName('pages__site-map-item')}
      name="Travel ✈️"
    >
      <TextLink href="/travel/iceland-2018"> Iceland </TextLink>
      <br />
      <TextLink href="/travel/longleat-2017"> Longleat </TextLink>
      <br />
      <TextLink href="/travel/munich-2017"> Munich </TextLink>
      <br />
      <TextLink href="/travel/disneyland-2017">Disneyland</TextLink>
      <br />
      <TextLink href="/travel/serre-chevalier-2017"> Serre Chevalier </TextLink>
    </SubSection>
    <SubSection
      noAnchor
      className={getClassName('pages__site-map-item')}
      name="Photography 🎨"
    >
      <TextLink href="/photography">Artistic creations</TextLink>
    </SubSection>
    <SubSection
      noAnchor
      className={getClassName('pages__site-map-item')}
      name="Work 📱"
    >
      <TextLink href="/work">Portfolio</TextLink>
      <br />
      <TextLink href="/apps/password-character-extractor">
        Password Character Extractor
      </TextLink>
      {/* <br />
      <TextLink href="/work/bpk-component-demo">
        Backpack Demo Component
      </TextLink> */}
      {/* <br />
          <TextLink href="/travel/longleat-2017"> Longleat </TextLink>
          <br />
          <TextLink href="/travel/munich-2017"> Munich </TextLink> */}
    </SubSection>
    {/* <SubSection noAnchor className={getClassName('pages__site-map-item')} name="Documents 🥇">
        <TextLink  href="/documents/degree">
         <SubSection noAnchor nclassName={getClassName('pages__site-map-item')}oPadding link name="Degree Certificate - 2018
        </TextLink>
        <br />
      </SubSection> */}
    <SubSection
      noAnchor
      className={getClassName('pages__site-map-item')}
      name="Other stuff 🤷‍♂️"
    >
      <TextLink href="/about"> About me </TextLink>
      <br />
      <TextLink href="/contact"> Contact </TextLink>
    </SubSection>
  </div>
);

export default SiteMap;
