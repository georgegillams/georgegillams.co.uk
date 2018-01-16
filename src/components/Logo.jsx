import React from 'react';
import PropTypes from 'prop-types';
import BpkText from 'bpk-component-text';

import STYLES from './logo.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const Logo = (props) => {
  const {
    small, className, alwaysCentered, light, ...rest
  } = props;
  const classNameFinal = [getClassName('logo__container')];
  if (className) { classNameFinal.push(className); }
  if (alwaysCentered) { classNameFinal.push(getClassName('logo__container--centered')); }

  const baseTextClassNameFinal = [getClassName('logo__logo-base')];
  if (light) { baseTextClassNameFinal.push(getClassName('logo__logo-base--light')); }

  const largeTextClassNameFinal = [getClassName('logo__logo-large')];
  if (small) { largeTextClassNameFinal.push(getClassName('logo__logo-large--smaller')); }

  return (
    <div className={classNameFinal.join(' ')} {...rest} >
      <a href="/">
        <BpkText textStyle="xxl" className={largeTextClassNameFinal.join(' ')} >
          {'<G/>'}
        </BpkText>
        {!small &&
        <div>
          <br />
          <br />
          <BpkText textStyle="lg" className={baseTextClassNameFinal.join(' ')} >
            {'George Gillams'}
          </BpkText>
        </div>
        }
      </a>
    </div>
  );
};

Logo.propTypes = {
  className: PropTypes.string,
  small: PropTypes.bool,
  light: PropTypes.bool,
  alwaysCentered: PropTypes.bool,
};

Logo.defaultProps = {
  className: null,
  small: false,
  light: false,
  alwaysCentered: false,
};

export default Logo;
