import Logo from 'components/Logo';
import styled from 'styled-components';
import Footer from './footer-nav';
import TechSpecs from './tech-specs';
import { breakpointSm, spacingBase, spacingLg } from '@george-gillams/components/constants/layout';
import {
  backgroundColorElevatedColoredinvert,
  notBlack,
  notBlackDarkMode,
  primaryColor,
} from '@george-gillams/components/constants/colors';

export const Container = styled.footer`
  display: flex;
  padding: ${spacingLg} ${spacingBase};
  flex-direction: column;
  justify-content: space-around;
  border-top: solid ${notBlack} 0.15rem;
  background-color: ${notBlack};
  background-position: center;
  background-size: cover;
  color: ${notBlackDarkMode};

  @media (min-width: ${breakpointSm}) {
    padding: ${spacingLg} ${spacingLg};
  }

  @media (prefers-color-scheme: dark) {
    border-top: solid ${primaryColor} 0.15rem;
    background-color: ${backgroundColorElevatedColoredinvert};
  }
`;

export const StyledLogo = styled(Logo)`
  text-align: center;
`;

export const StyledTechSpecs = styled(TechSpecs)`
  text-align: center;
`;

export const StyledFooterNav = styled(Footer)``;
