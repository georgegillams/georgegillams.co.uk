import styled, { css, keyframes } from 'styled-components';

import { spacingLg } from '@george-gillams/components/constants/layout';

import SmoothCornersContainer from '@george-gillams/components/smooth-corners-container';

import { TF_HEIGHT, TF_WIDTH } from './fake-typeform.styles';

export { TF_HEIGHT, TF_WIDTH };

const BACKGROUND_COLOR = '#e8e8e8';
const GRAPH_COLOR = '#1a365d';

export const EDGE_CLASS = 'signal-graph__edge';
export const EDGE_ANIMATED_CLASS = 'signal-graph__edge--animated';
export const NODE_CLASS = 'signal-graph__node';
export const NODE_HUB_CLASS = 'signal-graph__node--hub';

const edgePulse = keyframes`
  0%, 100% {
    stroke-opacity: 0.2;
  }
  50% {
    stroke-opacity: 0.9;
  }
`;

const edgeStrokeStyles = css`
  stroke: ${GRAPH_COLOR};
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
  background: ${BACKGROUND_COLOR};
  padding: ${spacingLg};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledSvg = styled.svg`
  width: 100%;
  height: 100%;
  overflow: visible;

  line.${EDGE_CLASS}, path.${EDGE_CLASS} {
    ${edgeStrokeStyles}
  }

  path.${EDGE_ANIMATED_CLASS} {
    stroke-dasharray: 8 8;
  }

  circle.${NODE_CLASS} {
    fill: ${GRAPH_COLOR};
  }

  @media (prefers-reduced-motion: reduce) {
    line.${EDGE_CLASS}, path.${EDGE_CLASS} {
      animation: none;
    }
  }
`;
