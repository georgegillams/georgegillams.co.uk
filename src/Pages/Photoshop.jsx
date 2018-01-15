import React from 'react';
import PropTypes from 'prop-types';
import BpkText from 'bpk-component-text';
import BpkImage, { withLazyLoading, withLoadingBehavior } from 'bpk-component-image';
import Section from '../components/Section';
import SubSection from '../components/SubSection';
import SideBar from '../components/SideBar';

import STYLES from './pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';
const documentIfExists = typeof window !== 'undefined' ? document : null;
const FadingLazyLoadedImage = withLoadingBehavior(withLazyLoading(BpkImage, documentIfExists));

/* eslint-disable max-len */
const Photoshop = (props) => {
  const { className, ...rest } = props;
  const classNameFinal = [getClassName('pages__page')];
  if (className) { classNameFinal.push(className); }

  return (
    <SideBar>
      <main className={classNameFinal.join(' ')} {...rest} >
        <Section name="Photoshop">
          <SubSection name="Work 1">
              Work 1 description
        <br />
          </SubSection>
        </Section>
      </main>
    </SideBar>
  );
};

Photoshop.propTypes = {
  className: PropTypes.string,
};

Photoshop.defaultProps = {
  className: null,
};

export default Photoshop;
