import React from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'gg-components/helpers/cssModules';
import { Section } from 'gg-components/Section';

import reactLogo from './react-logo.svg';
import reduxLogo from './redux-logo.svg';
import awsLogo from './aws-logo.svg';

import STYLES from './tech-specs.scss';

const getClassName = cssModules(STYLES);

const TechSpecs = props => {
  const { className, ...rest } = props;

  const outerClassNames = [];
  if (className) {
    outerClassNames.push(className);
  }

  const iconClassName = getClassName('tech-specs__icon');

  return (
    <div className={outerClassNames.join(' ')} {...rest}>
      <Section className={getClassName('tech-specs__container')} noPadding>
        <span className={getClassName('tech-specs__text')}>Built in</span>
        <a href="https://reactjs.org/" rel="noopener noreferrer" target="_blank">
          <img alt="React" width={5} height={5} className={iconClassName} src={reactLogo} />
        </a>
        <span className={getClassName('tech-specs__text')}>and</span>
        <a href="https://redux.js.org/" rel="noopener noreferrer" target="_blank">
          <img alt="Redux" width={5} height={5} className={iconClassName} src={reduxLogo} />
        </a>
        <span className={getClassName('tech-specs__text')}>Hosted on</span>
        <a href="https://aws.amazon.com/" rel="noopener noreferrer" target="_blank">
          <img
            alt="Amazon Web Services"
            width={8.28}
            height={5}
            className={iconClassName}
            style={{ marginTop: '.8rem', maxWidth: '2.9rem' }}
            src={awsLogo}
          />
        </a>
      </Section>
    </div>
  );
};

TechSpecs.propTypes = {
  className: PropTypes.string,
};

TechSpecs.defaultProps = {
  className: null,
};

export default TechSpecs;
