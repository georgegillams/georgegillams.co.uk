import React from 'react';
import PropTypes from 'prop-types';
import BpkImage, {
  withLazyLoading,
  withLoadingBehavior,
} from 'bpk-component-image';
import TextLink from '../../components/TextLink';
import Section from '../../components/Section';
import Comments from '../../components/Comments';
import santanderPasswordEntry from './images/santanderPasswordEntry.png';
import santanderHollywood from './images/santanderHollywood.png';

import STYLES from '../pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';
const documentIfExists = typeof window !== 'undefined' ? document : null;
const FadingLazyLoadedImage = withLoadingBehavior(
  withLazyLoading(BpkImage, documentIfExists),
);
// const DATE_WRITTEN = new Date(2018, 1, 20, 14, 52, 0);
const PAGE_ID = 827461;

const UkBankSecurity = props => {
  const { className, ...rest } = props;
  const classNameFinal = [];
  if (className) {
    classNameFinal.push(className);
  }

  return (
    <main className={classNameFinal.join(' ')} {...rest}>
      <Section name="UK Bank Security">
        When logging into a number of UK bank websites, they ask for particular
        characters from a password or memorable word. Some banks implement this
        as an additional layer of security after checking your full username and
        password (TSB, Halifax, John Lewis), which is effective in preventing
        keylogger attacks from gaining access (at least for several days). Other
        banks (Santander, RBS) implement this to the detriment of their
        security.
        <br />
        <br />
        The reason Santander and RBS&apos;s approaches are so dangerous is that
        asking for specific characters prevents them from securely hashing and
        salting your credentials when they are stored. Instead, Santander and
        RBS must store your credentials either in plain text, or using a
        reversible encryption algorithm. Either way, if a hacker accessed their
        database of login credentials they would be able to use them immediately
        to log into any account. On the contrary, if they stole hashed and
        salted credentials, it would take them several hundred years to decode
        the data and actually log in to any account.
        <br />
        <br />
        <TextLink
          href="https://security.stackexchange.com/questions/7467/how-secure-is-asking-for-specific-characters-of-passwords-instead-of-the-entire"
          external
        >
          Find out more on security.stackexchange.com{' '}
        </TextLink>
        <br />
        <br />
        <FadingLazyLoadedImage
          className={getClassName('pages__image')}
          altText="Santander's detrimental password entry form"
          style={{ width: '30rem' }}
          width={1228}
          height={954}
          src={santanderPasswordEntry}
        />
        <br />
        In addition to their insecure login procedure, Santander employs
        Hollywood security in the form of a user-selected image and phrase which
        is shown during login. The idea behind this is that if someone were to
        create a fake copy of their website, your selected image and phrase
        would be wrong. In reality, it would be simple for the attacker to
        simply lift the user-specific information from the genuine site and
        place it into their forged site.
        <br />
        <br />
        <TextLink
          href="https://en.wikipedia.org/wiki/SiteKey#Weaknesses"
          external
        >
          Find out more on Wikipedia{' '}
        </TextLink>
        <br />
        <br />
        <FadingLazyLoadedImage
          className={getClassName('pages__image')}
          altText="Santander's Hollywood security"
          style={{ width: '30rem' }}
          width={2378}
          height={811}
          src={santanderHollywood}
        />
        <br />
      </Section>
      <Comments pageId={PAGE_ID} />
    </main>
  );
};

UkBankSecurity.propTypes = {
  className: PropTypes.string,
};

UkBankSecurity.defaultProps = {
  className: null,
};

export default UkBankSecurity;
