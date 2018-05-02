import React from 'react';
import PropTypes from 'prop-types';
import BpkImage, {
  withLazyLoading,
  withLoadingBehavior,
} from 'bpk-component-image';
import GitHubForkRibbon from 'react-github-fork-ribbon';
import Section from '../../components/Section';
import Button from '../../components/Button';
import SubSection from '../../components/SubSection';
import PageSwitchScroller from '../../components/PageSwitchScroller';

import STYLES from './apps.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';
const documentIfExists = typeof window !== 'undefined' ? document : null;
const FadingLazyLoadedImage = withLoadingBehavior(
  withLazyLoading(BpkImage, documentIfExists),
);

const passwordCharacterExtractor = props => {
  const { className, ...rest } = props;
  const classNameFinal = [getClassName('apps__page')];
  if (className) {
    classNameFinal.push(className);
  }

  return (
    <main className={classNameFinal.join(' ')} {...rest}>
      <PageSwitchScroller />
      <div className={getClassName('apps__showcase')}>
        <GitHubForkRibbon
          position="right-bottom"
          color="red"
          href="https://github.com/georgegillams/SecurePasswordCharacterExtractor/"
          target="_blank"
        >
          View on GitHub
        </GitHubForkRibbon>
        <Section light name="Password Character Extractor">
          <SubSection
            noAnchor
            light
            name="Get the characters you need. Secure and easy."
          />
        </Section>
        <div className={getClassName('apps__showcase--padded')}>
          <BpkImage
            className={getClassName('apps__image')}
            altText="Password Character Extraction Use"
            style={{ maxWidth: '55rem' }}
            width={2224}
            height={514}
            src="https://i.imgur.com/jc8QRic.png"
          />
        </div>
      </div>
      <div className={getClassName('apps__download-container')}>
        <Button
          bouncy
          light
          onClick={() => {
            window.open(
              'https://github.com/georgegillams/SecurePasswordCharacterExtractor/releases/download/1.0.0/SecurePasswordCharacterExtractor.jar',
              '_blank',
            );
          }}
        >
          Download for Other OSes
        </Button>
        <Button
          onClick={() => {
            window.open(
              'https://github.com/georgegillams/SecurePasswordCharacterExtractor/raw/master/release/Secure_Password_Character_Extractor.zip',
              '_blank',
            );
          }}
        >
          Download for macOS
        </Button>
      </div>
      <Section name="Features">
        <div className={getClassName('apps__feature-container')}>
          <SubSection
            name="Secure"
            className={getClassName('apps__feature-section')}
          >
            Your pin is used to encrypt all password data on disk. Characters
            are only decoded when they are needed.
            <br />
            <br />
            So if anyone else accesses your machine, they won&apos;t be able to
            use the app or see the data without your pin to decrypt it.
            <br />
            <br />
            <FadingLazyLoadedImage
              className={getClassName('apps__image')}
              altText="Password Character Extraction Pin Entry"
              style={{ width: '100%' }}
              width={512}
              height={233}
              src="https://i.imgur.com/BUHJs6N.gif"
            />
          </SubSection>
          <SubSection
            name="Easy"
            className={getClassName('apps__feature-section')}
          >
            Easily extract the information you need to login without writing
            your whole password out and then painfully counting along to get the
            right letter.
            <br />
            <br />
            So you can log in safely, without making mistakes.
          </SubSection>
        </div>
        <FadingLazyLoadedImage
          className={getClassName('apps__image')}
          altText="Password Character Extraction Tool"
          style={{ width: '100%' }}
          width={1154}
          height={422}
          src="https://i.imgur.com/L8RHzZX.gif"
        />
        <br />
        <br />
        <Button href="/articles/uk-bank-security">
          More information on UK bank security →
        </Button>
      </Section>
    </main>
  );
};

passwordCharacterExtractor.propTypes = {
  className: PropTypes.string,
};

passwordCharacterExtractor.defaultProps = {
  className: null,
};

export default passwordCharacterExtractor;
