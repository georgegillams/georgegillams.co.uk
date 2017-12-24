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

  const southampton = (
    <a className={`${getClassName('personal-details__link')} ${getClassName('personal-details__link--southampton-blue')}`} href="https://www.ecs.soton.ac.uk/programmes/g600-meng-software-engineering-4-yrs#modules" rel="noopener noreferrer" target="_blank" >
      Southampton
    </a>
  );

  const skyscanner = (
    <a className={`${getClassName('personal-details__link')} ${getClassName('personal-details__link--skyscanner-blue')}`} href="https://github.com/Skyscanner" rel="noopener noreferrer" target="_blank" >
      Skyscanner
    </a>
  );

  const photobomber = (
    <a className={getClassName('personal-details__link')} href="/services/photobombing">
      Passionate photobomber.
    </a>
  );

  const engaged = (
    <a className={getClassName('personal-details__link')} href="/engagement">
      engaged
    </a>
  );

  return (
    <div className={classNameFinal.join(' ')} {...rest} >
      <div className={getClassName('personal-details__section')}>
        <BpkText style={{ width: '12.5rem' }} tagName="h3" textStyle="base">
            Open-source Software Engineer at {skyscanner}.
            <br />
            Masters student at {southampton}.
            <br />
           Based in London.
            <br />
          {photobomber}
          {/* <br />
           Recently {engaged}! */}
        </BpkText>
      </div>
      <div className={getClassName('personal-details__section')}>
        <GetSocial />
      </div>
      <div className={getClassName('personal-details__section')}>
        <BpkText tagName="h3" textStyle="sm">v_1.0.5</BpkText>
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
