import React from 'react';
import PropTypes from 'prop-types';
import Section from './Section';

import STYLES from './personal-details.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const PersonalDetails = (props) => {
  const { className, light, ...rest } = props;
  const classNameFinal = [getClassName('personal-details__container')];
  if (className) { classNameFinal.push(className); }

  const textClassNameFinal = [];
  if (light) textClassNameFinal.push(getClassName('personal-details__section--light'));

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
        <Section className={textClassNameFinal.join(' ')} name="">
            Open-source Software Engineer at {skyscanner}.
            <br />
            Masters student at {southampton}.
            <br />
           Based in London.
        </Section>
      </div>
    </div>
  );
};

PersonalDetails.propTypes = {
  className: PropTypes.string,
  light: PropTypes.bool,
};

PersonalDetails.defaultProps = {
  className: null,
  light: false,
};

export default PersonalDetails;
