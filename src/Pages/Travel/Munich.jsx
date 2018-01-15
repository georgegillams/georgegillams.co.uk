import React from 'react';
import PropTypes from 'prop-types';
import BpkImage, { withLazyLoading, withLoadingBehavior } from 'bpk-component-image';
import Section from './../../components/Section';
import SubSection from './../../components/SubSection';
import SideBar from '../../components/SideBar';
import Comments from '../../components/Comments';
import philMunich from './images/munichPhil.jpg';

import STYLES from '../pages.scss';

const PAGE_ID = 1029384;

const getClassName = className => STYLES[className] || 'UNKNOWN';
const documentIfExists = typeof window !== 'undefined' ? document : null;
const FadingLazyLoadedImage = withLoadingBehavior(withLazyLoading(BpkImage, documentIfExists));

/* eslint-disable max-len */
const Munich = (props) => {
  const { className, ...rest } = props;
  const classNameFinal = [getClassName('pages__page')];
  if (className) { classNameFinal.push(className); }

  return (
    <SideBar>
      <main className={classNameFinal.join(' ')} {...rest} >
        <Section name="Munich ⛪️ Christmas 2017" >
          <a className={getClassName('pages__link')} href="https://flic.kr/s/aHsm9VxHMV" rel="noopener noreferrer" target="_blank">
            <SubSection name="See the full album on Flickr →" textClassName={getClassName('pages__link')} />
            <FadingLazyLoadedImage className={getClassName('pages__image')} altText="My brother up a tree" width={2514} height={1676} src={philMunich} />
          </a>
        </Section>
        <Comments pageId={PAGE_ID} />
      </main>
    </SideBar>
  );
};

Munich.propTypes = {
  className: PropTypes.string,
};

Munich.defaultProps = {
  className: null,
};

export default Munich;
