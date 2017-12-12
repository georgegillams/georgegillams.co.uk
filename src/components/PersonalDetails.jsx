import React from 'react';
import PropTypes from 'prop-types';
import BpkText from 'bpk-component-text';
import GetSocial from './GetSocial';

import STYLES from './personal-details.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const PersonalDetails = (props) => {
  const { className, ...rest } = props;
  const classNameFinal = [getClassName('personal-details__container')];
  if (className) { classNameFinal.push(className); }

  return (
    <div className={classNameFinal.join(' ')} {...rest} >
      <div className={getClassName('personal-details__section')}>
        <a className={getClassName('personal-details__link')} href="/">
          <BpkText tagName="h1" textStyle="xl">George Gillams</BpkText>
        </a>
        <BpkText tagName="h3" textStyle="base">
          Open-source Software Engineer at
          <a className={getClassName('personal-details__link')} href="https://github.com/Skyscanner" rel="noopener noreferrer" target="_blank" >
            {' Skyscanner '}
          </a>
      and completeing a Masters at Southampton.
      <a className={getClassName('personal-details__link')} href="/engagement">
        {' Recently engaged.'}
      </a>
        </BpkText>
      </div>
      <div className={getClassName('personal-details__section')}>
        <GetSocial />
      </div>
      <div className={getClassName('personal-details__section')}>
        <BpkText tagName="h3" textStyle="sm">v_1.0.2</BpkText>
      </div>
    </div>
  );
};

PersonalDetails.propTypes = {
  className: PropTypes.string,
};

PersonalDetails.defaultProps = {
  className: null,
};

export default PersonalDetails;
