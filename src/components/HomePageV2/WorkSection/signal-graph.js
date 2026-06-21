import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import {
  EDGE_ACCENT_CLASS,
  EDGE_ANIMATED_CLASS,
  EDGE_CLASS,
  NODE_ACCENT_CLASS,
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
    speed: 0.0009,
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
    speed: 0.00085,
    phase: 4.8,
    xPhase: 0.3,
    yPhase: 0,
  },
  {
    id: 'right',
    cx: 265,
    cy: 92,
    r: 3,
    driftX: 46,
    driftY: 33,
    speed: 0.00105,
    phase: 3.2,
    xPhase: 1.8,
    yPhase: 0.4,
  },
  {
    id: 'accent-a',
    cx: 108,
    cy: 115,
    r: 3.5,
    accent: true,
    driftX: 28,
    driftY: 20,
    speed: 0.00095,
    phase: 1.6,
    xPhase: 0.2,
    yPhase: 1.3,
  },
  {
    id: 'accent-b',
    cx: 195,
    cy: 55,
    r: 3.5,
    accent: true,
    driftX: 30,
    driftY: 18,
    speed: 0.00115,
    phase: 0.8,
    xPhase: 2.6,
    yPhase: 0.7,
  },
];

const EDGES = [
  { from: 'hub', to: 'top-left', pulseDelay: 0 },
  { from: 'hub', to: 'top-right', pulseDelay: 0.6 },
  { from: 'hub', to: 'bottom-left', pulseDelay: 1.2 },
  { from: 'hub', to: 'bottom-right', pulseDelay: 1.8 },
  { from: 'hub', to: 'left', pulseDelay: 0.3 },
  { from: 'hub', to: 'right', pulseDelay: 0.9 },
  { from: 'hub', to: 'accent-a', pulseDelay: 1.5 },
  { from: 'hub', to: 'accent-b', pulseDelay: 2.1 },
  { from: 'top-left', to: 'top-right', animated: true, pulseDelay: 0.45, dashPhase: 0 },
  { from: 'bottom-left', to: 'bottom-right', pulseDelay: 1.35 },
  { from: 'left', to: 'bottom-left', animated: true, pulseDelay: 1.65, dashPhase: 700 },
  { from: 'right', to: 'bottom-right', animated: true, pulseDelay: 1.05, dashPhase: 350 },
  { from: 'accent-a', to: 'accent-b', pulseDelay: 0.75 },
];

const NODE_BY_ID = NODES.reduce((nodesById, node) => {
  nodesById[node.id] = node;
  return nodesById;
}, {});

const createInitialPositions = () =>
  NODES.reduce((positions, node) => {
    positions[node.id] = { x: node.cx, y: node.cy };
    return positions;
  }, {});

const createInitialOscillators = () =>
  NODES.reduce((oscillators, node) => {
    oscillators[node.id] = {
      t: node.phase,
      t73: node.phase * 0.73,
      t115: node.phase * 1.15,
      t61: node.phase * 0.61,
    };
    return oscillators;
  }, {});

// Advance phase by a small delta without letting the angle grow unbounded (which degrades sin/cos precision).
const advancePhase = (phase, deltaAngle) => Math.atan2(Math.sin(phase + deltaAngle), Math.cos(phase + deltaAngle));

const updatePositions = (positions, oscillators, delta) => {
  NODES.forEach(node => {
    const osc = oscillators[node.id];
    const deltaAngle = delta * node.speed;
    const xPhase = node.xPhase || 0;
    const yPhase = node.yPhase || 0;
    const pos = positions[node.id];

    osc.t = advancePhase(osc.t, deltaAngle);
    osc.t73 = advancePhase(osc.t73, deltaAngle * 0.73);
    osc.t115 = advancePhase(osc.t115, deltaAngle * 1.15);
    osc.t61 = advancePhase(osc.t61, deltaAngle * 0.61);

    pos.x = node.cx + Math.sin(osc.t + xPhase) * node.driftX + Math.cos(osc.t73 + yPhase) * node.driftX * 0.35;
    pos.y = node.cy + Math.sin(osc.t115 + yPhase) * node.driftY + Math.sin(osc.t61 + xPhase) * node.driftY * 0.3;
  });
};

const DASH_OFFSET_CYCLE = 16;
const DASH_OFFSET_DURATION_MS = 2500;

const getEdgeDashOffset = (elapsed, phase = 0, duration = DASH_OFFSET_DURATION_MS) => {
  const progress = ((elapsed + phase) / duration) % 1;
  return -progress * DASH_OFFSET_CYCLE;
};

const getEdgePulseStyle = ({ pulseDelay = 0, pulseDuration = 3 }) => ({
  animationDelay: `${pulseDelay}s`,
  animationDuration: `${pulseDuration}s`,
});

const setCirclePosition = (el, x, y) => {
  el.cx.baseVal.value = x;
  el.cy.baseVal.value = y;
};

const setLinePosition = (el, start, end) => {
  el.x1.baseVal.value = start.x;
  el.y1.baseVal.value = start.y;
  el.x2.baseVal.value = end.x;
  el.y2.baseVal.value = end.y;
};

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const SignalGraph = props => {
  const { ...rest } = props;
  const positionsRef = useRef(createInitialPositions());
  const oscillatorsRef = useRef(createInitialOscillators());
  const lastTimeRef = useRef(null);
  const dashTimeRef = useRef(0);
  const nodeRefs = useRef({});
  const lineRefs = useRef({});
  const animatedLineRefs = useRef({});

  useEffect(() => {
    if (prefersReducedMotion()) {
      return undefined;
    }

    let frameId = null;

    const tick = time => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = time;
        frameId = window.requestAnimationFrame(tick);
        return;
      }

      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;
      dashTimeRef.current += delta;

      const positions = positionsRef.current;
      updatePositions(positions, oscillatorsRef.current, delta);

      NODES.forEach(node => {
        const el = nodeRefs.current[node.id];
        if (!el) {
          return;
        }
        const { x, y } = positions[node.id];
        setCirclePosition(el, x, y);
      });

      EDGES.forEach(edge => {
        const { from, to, animated, dashPhase = 0, dashDuration = DASH_OFFSET_DURATION_MS } = edge;
        const start = positions[from];
        const end = positions[to];
        const key = `${from}-${to}`;
        const el = animated ? animatedLineRefs.current[key] : lineRefs.current[key];

        if (!el) {
          return;
        }

        setLinePosition(el, start, end);

        if (animated) {
          el.style.strokeDashoffset = getEdgeDashOffset(dashTimeRef.current, dashPhase, dashDuration);
        }
      });

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
        {EDGES.map(edge => {
          const { from, to, animated } = edge;
          const start = NODE_BY_ID[from];
          const end = NODE_BY_ID[to];
          const isAccentEdge = NODE_BY_ID[from].accent || NODE_BY_ID[to].accent;
          const className = [EDGE_CLASS, animated && EDGE_ANIMATED_CLASS, isAccentEdge && EDGE_ACCENT_CLASS]
            .filter(Boolean)
            .join(' ');
          const key = `${from}-${to}`;
          const pulseStyle = getEdgePulseStyle(edge);

          if (animated) {
            return (
              <line
                key={key}
                ref={el => {
                  animatedLineRefs.current[key] = el;
                }}
                className={className}
                style={pulseStyle}
                x1={start.cx}
                y1={start.cy}
                x2={end.cx}
                y2={end.cy}
              />
            );
          }

          return (
            <line
              key={key}
              ref={el => {
                lineRefs.current[key] = el;
              }}
              className={className}
              style={pulseStyle}
              x1={start.cx}
              y1={start.cy}
              x2={end.cx}
              y2={end.cy}
            />
          );
        })}
        {NODES.map(node => {
          const classNames = [NODE_CLASS];

          if (node.hub) {
            classNames.push(NODE_HUB_CLASS);
          }

          if (node.accent) {
            classNames.push(NODE_ACCENT_CLASS);
          }

          return (
            <circle
              key={node.id}
              ref={el => {
                nodeRefs.current[node.id] = el;
              }}
              className={classNames.join(' ')}
              cx={node.cx}
              cy={node.cy}
              r={node.r}
            />
          );
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
