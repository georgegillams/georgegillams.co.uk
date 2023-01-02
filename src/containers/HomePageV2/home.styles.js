// @import '~utils/tokens';

import styled from 'styled-components';
import WorkSection from 'components/HomePageV2/WorkSection';
import LifeSection from 'components/HomePageV2/LifeSection';
import AboutSection from 'components/HomePageV2/AboutSection';
import { breakpointMd, spacingBase, spacingLg } from '@george-gillams/components/constants/layout';

export const StyledWorkSection = styled(WorkSection)`
  width: 100%;
  margin-top: ${spacingBase};

  @media (min-width: ${breakpointMd}) {
    margin-top: ${spacingLg};
  }
`;

export const StyledLifeSection = styled(LifeSection)`
  width: 100%;
  margin-top: 2rem;

  @media (min-width: ${breakpointMd}) {
    margin-top: 4rem;
  }
`;

export const StyledAboutSection = styled(AboutSection)`
  width: 100%;
  margin-top: 2rem;

  @media (min-width: ${breakpointMd}) {
    margin-top: 6rem;
  }
`;
