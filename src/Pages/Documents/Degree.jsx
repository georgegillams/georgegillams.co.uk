import React from 'react';
import PropTypes from 'prop-types';
import BpkImage, { withLazyLoading, withLoadingBehavior } from 'bpk-component-image';
import Section from './../../components/Section';
import SideBar from '../../components/SideBar';
import degreeCertificate from './images/degreeCertificate.jpg';

import STYLES from '../pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';
const documentIfExists = typeof window !== 'undefined' ? document : null;
const FadingLazyLoadedImage = withLoadingBehavior(withLazyLoading(BpkImage, documentIfExists));

/* eslint-disable max-len */
const Degree = (props) => {
  const { className, ...rest } = props;
  const classNameFinal = [getClassName('pages__page')];
  if (className) { classNameFinal.push(className); }

  return (
    <SideBar>
      <main className={classNameFinal.join(' ')} {...rest} >
        <Section name="MEng Software Engineering 🎓 2018" >
          <FadingLazyLoadedImage className={getClassName('pages__image')} altText="Degree certificate" width={1000} height={1414} src={degreeCertificate} />
        </Section>
      </main>
    </SideBar>
  );
};

Degree.propTypes = {
  className: PropTypes.string,
};

Degree.defaultProps = {
  className: null,
};

export default Degree;
