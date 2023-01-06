import React from 'react';
import styled, { keyframes } from 'styled-components';
import SpartanMedal, { EVENT_TYPE as SPARTAN_EVENT_TYPE } from '@george-gillams/components/spartan-medal';

import { breakpointMd, spacingLg } from '@george-gillams/components/constants/layout';

const scrollAnimation = keyframes`
 from { 
  transform:  translate(-4rem, 0);
 }
 to { 
  transform:  translate(calc(-4rem - 50%), 0);
 }
  `;

const OuterWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 12rem;
  min-height: 9rem;
`;

const InnerWrapper = styled.div`
  position: absolute;
  animation: ${scrollAnimation} 10s linear infinite;
  display: flex;
  flex-direction: row;
`;

const Medal = styled(SpartanMedal)`
  width: 14rem;
  height: 14rem;
  margin: 0 calc(${spacingLg} - 7rem) 0 0;
  transform: scale(0.5);

  @media (min-width: ${breakpointMd}) {
    margin: 0 calc(4 * ${spacingLg} - 7rem) 0 0;
  }
`;

const MedalGallery = props => {
  const { ...rest } = props;

  return (
    <OuterWrapper aria-label="A scrolling gallery of Spartan medals. View full medals on the medals page." {...rest}>
      <InnerWrapper aria-hidden={true}>
        <Medal type={SPARTAN_EVENT_TYPE.sprint} year={'2022'} />
        <Medal type={SPARTAN_EVENT_TYPE.super} year={'2022'} />
        <Medal type={SPARTAN_EVENT_TYPE.beast} year={'2022'} />
        <Medal type={SPARTAN_EVENT_TYPE.sprint} year={'2022'} />
        <Medal type={SPARTAN_EVENT_TYPE.super} year={'2022'} />
        <Medal type={SPARTAN_EVENT_TYPE.beast} year={'2022'} />
      </InnerWrapper>
    </OuterWrapper>
  );
};

MedalGallery.propTypes = {};

MedalGallery.defaultProps = {};

export default MedalGallery;
