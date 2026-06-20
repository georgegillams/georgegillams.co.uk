import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
  EDGE_ANIMATED_CLASS,
  EDGE_CLASS,
  NODE_CLASS,
  NODE_HUB_CLASS,
  SGWrapper,
  StyledSvg,
} from './signal-graph.styles';

const NODES = [
  {
    id: 'hub',
    cx: 150,
    cy: 95,
    r: 8,
    hub: true,
    driftX: 10,
    driftY: 12,
    speed: 0.0007,
    phase: 0,
    xPhase: 0,
    yPhase: 0,
  },
  {
    id: 'top-left',
    cx: 75,
    cy: 35,
    r: 3.5,
    driftX: 58,
    driftY: 32,
    speed: 0.0011,
    phase: 0.4,
    xPhase: 0,
    yPhase: 0.5,
  },
  {
    id: 'top-right',
    cx: 225,
    cy: 45,
    r: 3.5,
    driftX: 58,
    driftY: 30,
    speed: 0.0013,
    phase: 0.4,
    xPhase: Math.PI,
    yPhase: 1.2,
  },
  {
    id: 'bottom-left',
    cx: 65,
    cy: 155,
    r: 3.5,
    driftX: 52,
    driftY: 28,
    speed: 0.001,
    phase: 2.1,
    xPhase: 0,
    yPhase: 0.8,
  },
  {
    id: 'bottom-right',
    cx: 235,
    cy: 145,
    r: 3.5,
    driftX: 52,
    driftY: 26,
    speed: 0.0012,
    phase: 2.1,
    xPhase: Math.PI,
    yPhase: 1.5,
  },
  {
    id: 'left',
    cx: 35,
    cy: 95,
    r: 3,
    driftX: 48,
    driftY: 35,
    speed: 0.0009,
    phase: 4.8,
    xPhase: 0.3,
    yPhase: 0,
  },
];

const EDGES = [
  { from: 'hub', to: 'top-left' },
  { from: 'hub', to: 'top-right' },
  { from: 'hub', to: 'bottom-left' },
  { from: 'hub', to: 'bottom-right' },
  { from: 'hub', to: 'left' },
  { from: 'top-left', to: 'top-right', animated: true },
  { from: 'bottom-left', to: 'bottom-right' },
  { from: 'left', to: 'bottom-left', animated: true },
];

const getStaticPositions = () =>
  NODES.reduce((positions, node) => {
    positions[node.id] = { x: node.cx, y: node.cy };
    return positions;
  }, {});

const getAnimatedPositions = time =>
  NODES.reduce((positions, node) => {
    const t = time * node.speed + node.phase;
    const xPhase = node.xPhase || 0;
    const yPhase = node.yPhase || 0;

    positions[node.id] = {
      x: node.cx + Math.sin(t + xPhase) * node.driftX + Math.cos(t * 0.73 + yPhase) * node.driftX * 0.35,
      y: node.cy + Math.sin(t * 1.15 + yPhase) * node.driftY + Math.sin(t * 0.61 + xPhase) * node.driftY * 0.3,
    };
    return positions;
  }, {});

const DASH_OFFSET_CYCLE = 16;
const DASH_OFFSET_DURATION_MS = 2500;

const getEdgeDashOffset = time => {
  const progress = (time / DASH_OFFSET_DURATION_MS) % 1;
  return -progress * DASH_OFFSET_CYCLE;
};

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const SignalGraph = props => {
  const { ...rest } = props;
  const [positions, setPositions] = useState(getStaticPositions);
  const [animationTime, setAnimationTime] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) {
      return undefined;
    }

    let frameId = null;

    const tick = time => {
      setPositions(getAnimatedPositions(time));
      setAnimationTime(time);
      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return (
    <SGWrapper aria-hidden="true" {...rest}>
      <StyledSvg viewBox="0 0 300 190" xmlns="http://www.w3.org/2000/svg">
        {EDGES.map(({ from, to, animated }) => {
          const start = positions[from];
          const end = positions[to];
          const className = animated ? `${EDGE_CLASS} ${EDGE_ANIMATED_CLASS}` : EDGE_CLASS;
          const key = `${from}-${to}`;

          if (animated) {
            return (
              <path
                key={key}
                className={className}
                d={`M ${start.x} ${start.y} L ${end.x} ${end.y}`}
                pathLength={100}
                fill="none"
                strokeDasharray="8 8"
                strokeDashoffset={getEdgeDashOffset(animationTime)}
              />
            );
          }

          return (
            <line
              key={key}
              className={className}
              x1={start.x}
              y1={start.y}
              x2={end.x}
              y2={end.y}
              style={{ animationDelay: `${(start.x % 7) * 0.15}s` }}
            />
          );
        })}
        {NODES.map(node => {
          const { x, y } = positions[node.id];
          const className = node.hub ? `${NODE_CLASS} ${NODE_HUB_CLASS}` : NODE_CLASS;

          return <circle key={node.id} className={className} cx={x} cy={y} r={node.r} />;
        })}
      </StyledSvg>
    </SGWrapper>
  );
};

SignalGraph.propTypes = {
  className: PropTypes.string,
};

SignalGraph.defaultProps = {
  className: null,
};

export default SignalGraph;
