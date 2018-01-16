import React from 'react';
import PropTypes from 'prop-types';
import Section from './Section';
import TextLink from './TextLink';

const TechSpecs = (props) => {
  const {
    light, fancy, className, children, ...rest
  } = props;
  const outerClassNameFinal = [];
  if (className) { outerClassNameFinal(className); }

  return (
    <div className={outerClassNameFinal.join(' ')} {...rest} >
      <Section light={light} fancy={fancy}>
          Built in <TextLink href="https://github.com/Skyscanner" rel="noopener noreferrer" target="_blank">React</TextLink>.
      </Section>
      <Section light={light} fancy={fancy}>
          Hosted on <TextLink href="https://www.ecs.soton.ac.uk/programmes/g600-meng-software-engineering-4-yrs#modules" rel="noopener noreferrer" target="_blank">GitHub</TextLink>.
      </Section>
      <Section light={light} fancy={fancy}>
          Data on <TextLink href="https://www.ecs.soton.ac.uk/programmes/g600-meng-software-engineering-4-yrs#modules" rel="noopener noreferrer" target="_blank">restdb.io</TextLink>.
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
