import styled, { css, keyframes } from 'styled-components';

import { spacingLg } from '@george-gillams/components/constants/layout';

import SmoothCornersContainer from '@george-gillams/components/smooth-corners-container';

import { TF_HEIGHT, TF_WIDTH } from './fake-typeform.styles';
import {
  alternatingBackgroundColor2,
  alternatingBackgroundColor2DarkMode,
  bpkColorMonteverde,
  primaryColor,
  primaryColorDark,
} from '@george-gillams/components/constants/colors';

export { TF_HEIGHT, TF_WIDTH };

export const EDGE_CLASS = 'signal-graph__edge';
export const EDGE_ANIMATED_CLASS = 'signal-graph__edge--animated';
export const EDGE_ACCENT_CLASS = 'signal-graph__edge--accent';
export const NODE_CLASS = 'signal-graph__node';
export const NODE_HUB_CLASS = 'signal-graph__node--hub';
export const NODE_ACCENT_CLASS = 'signal-graph__node--accent';

const edgePulse = keyframes`
  0%, 100% {
    stroke-opacity: 0.25;
  }
  50% {
    stroke-opacity: 0.7;
  }
`;

const edgeStrokeBaseStyles = css`
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-opacity: 0.35;
  animation: ${edgePulse} 3s ease-in-out infinite;
`;

export const SGWrapper = styled(SmoothCornersContainer).attrs({
  cornerRadiuses: {
    topLeft: 40,
    topRight: 40,
    bottomRight: 40,
    bottomLeft: 40,
  },
  idSuffixGenerator: () => 'homepage-signal-graph',
})`
  width: ${TF_WIDTH};
  height: ${TF_HEIGHT};
  background: ${alternatingBackgroundColor2};
  padding: ${spacingLg};
  display: flex;
  align-items: center;
  justify-content: center;

  @media (prefers-color-scheme: dark) {
    background: ${alternatingBackgroundColor2DarkMode};
  }
`;

export const StyledSvg = styled.svg`
  width: 100%;
  height: 100%;
  overflow: visible;

  line.${EDGE_CLASS}, path.${EDGE_CLASS} {
    stroke: ${primaryColorDark};
    ${edgeStrokeBaseStyles}
  }

  line.${EDGE_ANIMATED_CLASS} {
    stroke-dasharray: 8 8;
  }

  line.${EDGE_ACCENT_CLASS}, path.${EDGE_ACCENT_CLASS} {
    stroke: ${bpkColorMonteverde};
  }

  circle.${NODE_CLASS} {
    fill: ${primaryColorDark};
  }

  circle.${NODE_ACCENT_CLASS} {
    fill: ${bpkColorMonteverde};
  }

  @media (prefers-color-scheme: dark) {
    line.${EDGE_CLASS}, path.${EDGE_CLASS} {
      stroke: ${primaryColor};
    }

    line.${EDGE_ACCENT_CLASS}, path.${EDGE_ACCENT_CLASS} {
      stroke: ${bpkColorMonteverde};
    }

    circle.${NODE_CLASS} {
      fill: ${primaryColor};
    }

    circle.${NODE_ACCENT_CLASS} {
      fill: ${bpkColorMonteverde};
    }
  }

  @media (prefers-reduced-motion: reduce) {
    line.${EDGE_CLASS}, path.${EDGE_CLASS} {
      animation: none;
    }
  }
`;
