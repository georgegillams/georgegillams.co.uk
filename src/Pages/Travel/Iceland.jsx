import React from 'react';
import PropTypes from 'prop-types';
import BpkImage, { withLazyLoading, withLoadingBehavior } from 'bpk-component-image';
import Section from './../../components/Section';
import SubSection from './../../components/SubSection';
import SideBar from '../../components/SideBar';
import iceland0 from './images/iceland0.jpg';
import iceland1 from './images/iceland1.jpg';
import iceland2 from './images/iceland2.jpg';
import iceland3 from './images/iceland3.jpg';

import STYLES from '../pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';
const documentIfExists = typeof window !== 'undefined' ? document : null;
const FadingLazyLoadedImage = withLoadingBehavior(withLazyLoading(BpkImage, documentIfExists));

/* eslint-disable max-len */
const Iceland = (props) => {
  const { className, ...rest } = props;
  const classNameFinal = [getClassName('pages__page')];
  if (className) { classNameFinal.push(className); }

  return (
    <SideBar>
      <main className={classNameFinal.join(' ')} {...rest} >
        <Section name="Iceland  🛥 January 2018" >
          <a className={getClassName('pages__link')} href="https://flic.kr/s/aHskqS4GoZ" rel="noopener noreferrer" target="_blank">
            <SubSection name="See the full album on Flickr →" textClassName={getClassName('pages__link')} />
            <FadingLazyLoadedImage className={getClassName('pages__image')} altText="Overlooking the harbour" width={3} height={2} src={iceland2} />
            <FadingLazyLoadedImage className={getClassName('pages__image')} altText="Overlooking the harbour" width={3} height={2} src={iceland1} />
            <FadingLazyLoadedImage className={getClassName('pages__image')} altText="Overlooking the harbour" width={2} height={3} src={iceland3} />
          </a>
        </Section>
      </main>
    </SideBar>
  );
};

Iceland.propTypes = {
  className: PropTypes.string,
};

Iceland.defaultProps = {
  className: null,
};

export default Iceland;
