import React from 'react';
import PropTypes from 'prop-types';
import Section from './Section';
import TextLink from './TextLink';
import reactIcon from './../icons/react.png';
import restdbIcon from './../icons/restdb.png';
import githubIcon from './../icons/github.png';

import STYLES from './tech-specs.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const TechSpecs = (props) => {
  const {
    light, fancy, className, children, ...rest
  } = props;
  const outerClassNameFinal = [];
  if (className) { outerClassNameFinal.push(className); }

  const iconClassNameFinal = [getClassName('tech-specs__icon')];
  const darkIconClassNameFinal = [getClassName('tech-specs__icon')];
  iconClassNameFinal.push(getClassName('tech-specs__icon--no-light'));
  darkIconClassNameFinal.push(getClassName('tech-specs__icon--light-inverted'));

  return (
    <div className={outerClassNameFinal.join(' ')} {...rest} >
      <Section className={getClassName('tech-specs__container')} noPadding light={light} fancy={fancy}>
          Built in
      <a href="https://reactjs.org/" rel="noopener noreferrer" target="_blank">
        <img alt="react" width={5} height={5} className={iconClassNameFinal.join(' ')} src={reactIcon} />
      </a>
          Hosted on
      <a href="https://pages.github.com/" rel="noopener noreferrer" target="_blank">
        <img alt="react" width={5} height={5} className={darkIconClassNameFinal.join(' ')} src={githubIcon} />
      </a>
          Data on
      <a href="https://restdb.io/" rel="noopener noreferrer" target="_blank">
        <img alt="react" width={5} height={5} className={iconClassNameFinal.join(' ')} src={restdbIcon} />
      </a>
      </Section>
    </div>
  );
};

TechSpecs.propTypes = {
  light: PropTypes.bool,
  fancy: PropTypes.bool,
  className: PropTypes.string,
};

TechSpecs.defaultProps = {
  light: false,
  fancy: false,
  className: null,
};

export default TechSpecs;
