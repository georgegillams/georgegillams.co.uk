import React from 'react';

import reactLogo from './react-logo.svg';
import reduxLogo from './redux-logo.svg';
import awsLogo from './aws-logo.svg';
import { Icon, StyledParagraph } from './tech-specs.styles';

const TechSpecs = props => {
  return (
    <div {...props}>
      <StyledParagraph>
        Built in
        <a href="https://reactjs.org/" rel="noopener noreferrer" target="_blank">
          <Icon alt="React" width={5} height={5} src={reactLogo} />
        </a>
        and
        <a href="https://redux.js.org/" rel="noopener noreferrer" target="_blank">
          <Icon alt="Redux" width={5} height={5} src={reduxLogo} />
        </a>
        Hosted on
        <a href="https://aws.amazon.com/" rel="noopener noreferrer" target="_blank">
          <Icon
            alt="Amazon Web Services"
            width={8.28}
            height={5}
            style={{ marginTop: '.8rem', maxWidth: '2.9rem' }}
            src={awsLogo}
          />
        </a>
      </StyledParagraph>
    </div>
  );
};

export default TechSpecs;
