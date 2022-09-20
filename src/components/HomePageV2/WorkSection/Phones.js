import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import light0 from './images/light0.png';
import light1 from './images/light1.png';
import light2 from './images/light2.png';
import dark0 from './images/dark0.png';
import dark1 from './images/dark1.png';
import dark2 from './images/dark2.png';
import { Wrapper, StyledSlidingPhone } from './phones.styles';

const Phones = props => {
  const { hasBeenMostlyInView, ...rest } = props;

  const [animationStarted, setAnimationStarted] = useState(false);
  const [timedDisplayStates, setTimedDisplayStates] = useState([false, false, false]);
  const [nextDisplayState, setNextDisplayState] = useState(0);

  useEffect(() => {
    let timeout1 = null;
    let timeout2 = null;

    if (!animationStarted && hasBeenMostlyInView) {
      timeout1 = setTimeout(() => {
        setAnimationStarted(true);
      }, 750);
    }

    if (animationStarted && nextDisplayState < timedDisplayStates.length) {
      timeout2 = setTimeout(() => {
        const newDisplayStates = timedDisplayStates;
        newDisplayStates[nextDisplayState] = true;
        setTimedDisplayStates(newDisplayStates);
        setNextDisplayState(nextDisplayState + 1);
      }, 200);
    }

    const cleanUp = () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
    return cleanUp;
  }, [animationStarted, timedDisplayStates, nextDisplayState, hasBeenMostlyInView]);

  return (
    <Wrapper {...rest}>
      <StyledSlidingPhone
        show={timedDisplayStates[0]}
        lightSrc={light0}
        darkSrc={dark0}
        imgProps={{
          alt: 'A screenshot of our Backpack design principles',
        }}
      />
      <StyledSlidingPhone
        show={timedDisplayStates[1]}
        lightSrc={light1}
        darkSrc={dark1}
        imgProps={{
          alt: 'A screenshot of our bar chart component on iOS',
        }}
      />
      <StyledSlidingPhone
        show={timedDisplayStates[2]}
        lightSrc={light2}
        darkSrc={dark2}
        imgProps={{
          alt: 'A screenshot of our flare view component on web',
        }}
      />
    </Wrapper>
  );
};

Phones.propTypes = { hasBeenMostlyInView: PropTypes.bool.isRequired };

Phones.defaultProps = {};

export default Phones;
