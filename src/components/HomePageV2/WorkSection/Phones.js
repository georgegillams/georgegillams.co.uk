import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { withScroll } from 'gg-components/ScrollContainer';
import { Paragraph } from 'gg-components/Paragraph';
import SlidingPhone from './SlidingPhone';
import STYLES from './phones.scss';
import { cssModules } from 'gg-components/helpers/cssModules';

import light0 from './images/light0.png';
import light1 from './images/light1.png';
import light2 from './images/light2.png';
import dark0 from './images/dark0.png';
import dark1 from './images/dark1.png';
import dark2 from './images/dark2.png';

const getClassName = cssModules(STYLES);

const Phones = props => {
  const { scrollPosition, className, ...rest } = props;

  const [animationStarted, setAnimationStarted] = useState(false);
  const [timedDisplayStates, setTimedDisplayStates] = useState([false, false, false]);
  const [nextDisplayState, setNextDisplayState] = useState(0);

  useEffect(() => {}, []);

  useEffect(() => {
    let timeout1 = null;
    let timeout2 = null;

    if (!animationStarted) {
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
  }, [animationStarted, timedDisplayStates, nextDisplayState]);

  const scrolledDisplayStates = [scrollPosition > 45, scrollPosition > 55, scrollPosition > 65];

  const finalDisplayStates = timedDisplayStates.map((s, i) => s && scrolledDisplayStates[i]);

  return (
    <Paragraph className={getClassName('phones__outer', className)} {...rest}>
      <SlidingPhone
        className={getClassName('phones__phone')}
        show={finalDisplayStates[0]}
        lightSrc={light0}
        darkSrc={dark0}
      />
      <SlidingPhone
        className={getClassName('phones__phone')}
        show={finalDisplayStates[1]}
        lightSrc={light1}
        darkSrc={dark1}
      />
      <SlidingPhone
        className={getClassName('phones__phone')}
        show={finalDisplayStates[2]}
        lightSrc={light2}
        darkSrc={dark2}
      />
    </Paragraph>
  );
};

Phones.propTypes = { className: PropTypes.string, scrollPosition: PropTypes.number.isRequired };

Phones.defaultProps = { className: null };

export default withScroll(Phones);
