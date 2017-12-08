import React from 'react';
import PropTypes from 'prop-types';
import Section from './Section';

import STYLES from './for-oh-four.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

/* eslint-disable max-len */
const ForOhFour = (props) => {
  const { className, ...rest } = props;
  const classNameFinal = [getClassName('for-oh-four__container')];
  if (className) { classNameFinal.push(className); }

  return (
    <main className={classNameFinal.join(' ')} {...rest} >
      <Section
        className={getClassName('for-oh-four__container')}
        name="Oops."
      >
        The page you&apos;re looking for just isn&apos;t here.
      </Section>
    </main>
  );
};

ForOhFour.propTypes = {
  className: PropTypes.string,
};

ForOhFour.defaultProps = {
  className: null,
};

export default ForOhFour;
