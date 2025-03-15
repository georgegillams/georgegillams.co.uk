import React from 'react';

import reactLogo from './react-logo.svg';
import reduxLogo from './redux-logo.svg';
import awsLogo from './aws-logo.svg';
import { Icon, StyledParagraph } from './tech-specs.styles';
import TextLink from 'components/common/TextLink';

const TechSpecs = props => {
  return (
    <div {...props}>
      <StyledParagraph>
        Built in
        <TextLink href="https://reactjs.org/" rel="noopener noreferrer" target="_blank">
          <Icon alt="React" width={5} height={5} src={reactLogo.src} />
        </TextLink>
        with
        <TextLink href="https://redux.js.org/" rel="noopener noreferrer" target="_blank">
          <Icon alt="Redux" width={5} height={5} src={reduxLogo.src} />
        </TextLink>
        Hosted on
        <TextLink href="https://aws.amazon.com/" rel="noopener noreferrer" target="_blank">
          <Icon
            alt="Amazon Web Services"
            width={8.28}
            height={5}
            style={{ marginTop: '.8rem', maxWidth: '2.9rem' }}
            src={awsLogo.src}
          />
        </TextLink>
      </StyledParagraph>
    </div>
  );
};

export default TechSpecs;
