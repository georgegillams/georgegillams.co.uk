import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { cssModules } from '../helpers/cssModules';

import STYLES from './blur-effect.module.scss';

const getClassName = cssModules(STYLES);

const BlurEffectView = props => {
  const myRef = useRef(null);
  let mainScrollElement = null;
  let mainScrollElementClone = null;

  const adjustCloneScroll = () => {
    if (!mainScrollElement || !mainScrollElementClone) {
      return;
    }
    const yValue = mainScrollElement.offsetTop - window.pageYOffset;
    mainScrollElementClone.style.transform = `translatey(${yValue}px)`;
  };

  const cleanUpElements = htmlNode => {
    if (!htmlNode) {
      return;
    }
    /* eslint-disable no-param-reassign */
    htmlNode.id += '_clone';
    htmlNode.ariaHidden = true;
    htmlNode.tabIndex = -1;
    /* eslint-enable no-param-reassign */

    if (htmlNode.children && htmlNode.children.length) {
      for (let i = 0; i <= htmlNode.children.length; i += 1) {
        cleanUpElements(htmlNode.children[i]);
      }
    }
  };

  const recreateBlurClone = () => {
    if (!mainScrollElement || !myRef || !myRef.current) {
      return;
    }

    const newMainScrollElementClone = mainScrollElement.cloneNode(true);
    newMainScrollElementClone.style.filter = 'blur(10px)';
    newMainScrollElementClone.style.opacity = '0.5';
    cleanUpElements(newMainScrollElementClone);
    if (mainScrollElementClone) {
      myRef.current.removeChild(mainScrollElementClone);
    }
    mainScrollElementClone = newMainScrollElementClone;
    myRef.current.append(mainScrollElementClone);
    adjustCloneScroll();
  };

  useEffect(() => {
    mainScrollElement = document.getElementById(props.idToTrack);
    recreateBlurClone();
    const interval = setInterval(recreateBlurClone, 2000);
    window.addEventListener('scroll', () => {
      adjustCloneScroll();
    });

    const cleanUp = () => {
      clearInterval(interval);
    };
    return cleanUp;
  }, []);

  const { className, ...rest } = props;

  return <div ref={myRef} aria-hidden="true" className={getClassName('blur-effect__outer', className)} {...rest} />;
};

BlurEffectView.propTypes = {
  idToTrack: PropTypes.string.isRequired,
  className: PropTypes.string,
};

BlurEffectView.defaultProps = {
  className: null,
};

export default BlurEffectView;
