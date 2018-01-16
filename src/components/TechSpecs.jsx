import React from 'react';
import PropTypes from 'prop-types';
import Section from './Section';
import TextLink from './TextLink';

const TechSpecs = (props) => {
  const {
    light, fancy, className, children, ...rest
  } = props;
  const outerClassNameFinal = [];
  if (className) { outerClassNameFinal.push(className); }

  return (
    <div className={outerClassNameFinal.join(' ')} {...rest} >
      <Section light={light} fancy={fancy}>
          Built in <TextLink light={light} fancy={fancy} href="https://reactjs.org/" rel="noopener noreferrer" target="_blank">React</TextLink>
      </Section>
      <Section light={light} fancy={fancy}>
          Hosted on <TextLink light={light} fancy={fancy} href="https://pages.github.com/" rel="noopener noreferrer" target="_blank">GitHub pages</TextLink>
      </Section>
      <Section light={light} fancy={fancy}>
          Data on <TextLink light={light} fancy={fancy} href="https://restdb.io/" rel="noopener noreferrer" target="_blank">restdb.io</TextLink>
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
