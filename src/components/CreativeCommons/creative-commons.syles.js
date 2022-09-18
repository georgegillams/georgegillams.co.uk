import styled from 'styled-components';
import { spacingBase, spacingLg } from '@george-gillams/components/constants/layout';
import {
  alternatingBackgroundColor1,
  alternatingBackgroundColor1DarkMode,
} from '@george-gillams/components/constants/colors';
import Subsection from '@george-gillams/components/subsection';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  margin-top: ${spacingLg};
  margin-left: 0;
  padding-top: ${spacingBase};
  padding-bottom: ${spacingLg};
  justify-content: center;
`;

export const Background = styled.div`
  position: absolute;
  top: 0;
  left: calc(50% - 50vw);
  z-index: -1;
  width: 100vw;
  height: 100%;
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
