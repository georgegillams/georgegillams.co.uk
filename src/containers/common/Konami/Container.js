import React, { useState, useEffect } from 'react';
import KonamiResponder from 'konami';
import DebugObject from 'components/common/DebugObject';

const Konami = () => {
  const [konamiActivated, setKonamiActivated] = useState(false);
  const [easterEgg, setEasterEgg] = useState(false);

  const setupConfetti = () => {
    // Require confetti-generator here so that it is only loaded when required
    const ConfettiGenerator = require('confetti-js').default;
    const confettiSettings = { target: 'confetti-holder' };
    const confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();
  };

  useEffect(() => {
    const easterEgg = new KonamiResponder(() => {
      setKonamiActivated(true);
      setupConfetti();
    });
    setEasterEgg(easterEgg);
  }, []);

  return (
    <>
      {konamiActivated && (
        <canvas
          aria-hidden="true"
          id="confetti-holder"
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            pointerEvents: 'none',
          }}
        />
      )}
      <DebugObject debugTitle="Konami" debugObject={{ konamiActivated, easterEgg }} />
    </>
  );
};

export default Konami;
