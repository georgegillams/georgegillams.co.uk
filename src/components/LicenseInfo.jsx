import React from 'react';
import PropTypes from 'prop-types';
import BpkImage from 'bpk-component-image';
import TextLink from './TextLink';
import Section from './Section';

import STYLES from './license.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const LicenseInfo = props => {
  const { centered, className, ...rest } = props;
  const classNameFinal = [getClassName('license')];
  if (centered) {
    classNameFinal.push(getClassName('license--centered'));
  }
  if (className) {
    classNameFinal.push(className);
  }

  return (
    <div className={classNameFinal.join(' ')} {...rest}>
      <BpkImage
        alt="Creative Commons Licence"
        width={88}
        height={31}
        style={{ width: '5rem', marginBottom: '1rem' }}
        src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png"
      />
      <br />
      <Section>
        {'Most of my photos are licensed under a '}
        <TextLink
          external
          rel="license"
          href="http://creativecommons.org/licenses/by-sa/4.0/"
        >
          Creative Commons Attribution-ShareAlike 4.0 International License{' '}
        </TextLink>
        {'. If you wish to use any of them, please '}
        <TextLink href="contact">get in touch</TextLink>
        {'.'}
      </Section>{' '}
    </div>
  );
};

LicenseInfo.propTypes = {
  centered: PropTypes.bool,
  className: PropTypes.string,
};

LicenseInfo.defaultProps = {
  centered: false,
  className: null,
};

export default LicenseInfo;
