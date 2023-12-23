import React from 'react';

const JS_SCRIPT = `
  const workletURL = '/static/worklets/smooth-corners.js'
  if(typeof CSS?.paintWorklet?.addModule === 'function'){
    CSS.paintWorklet.addModule(workletURL)
  }
`;

export const SmoothCornersWorkletLoader = () => {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: JS_SCRIPT,
      }}
    />
  );
};
