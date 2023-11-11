import styled from 'styled-components';
import { spacingBase, spacingLg } from '@george-gillams/components/constants/layout';
import {
  alternatingBackgroundColor1,
  alternatingBackgroundColor1DarkMode,
} from '@george-gillams/components/constants/colors';
import Subsection from '@george-gillams/components/subsection';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: ${spacingLg};
  margin-left: 0;
  padding-top: ${spacingBase};
  padding-bottom: ${spacingLg};
  justify-content: center;
  background-color: ${alternatingBackgroundColor1};

  @media (prefers-color-scheme: dark) {
    background-color: ${alternatingBackgroundColor1DarkMode};
  }
`;

export const Inner = styled(Subsection)`
  width: 100%;
  padding-right: 1.875rem;
  padding-left: 1.865rem;
  text-align: center;

  @include bpk-breakpoint-tablet {
    padding-right: 0.9375rem;
    padding-left: 0.9375rem;
  }
`;
