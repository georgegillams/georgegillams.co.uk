import React from 'react';
import PropTypes from 'prop-types';
import BpkImage, { withLazyLoading, withLoadingBehavior } from 'bpk-component-image';
import Section from './../../components/Section';
import SubSection from './../../components/SubSection';
import Comments from '../../components/Comments';
import longleatLight from './images/longleatLight.jpg';

import STYLES from '../pages.scss';

const PAGE_ID = 834762;

const getClassName = className => STYLES[className] || 'UNKNOWN';
const documentIfExists = typeof window !== 'undefined' ? document : null;
const FadingLazyLoadedImage = withLoadingBehavior(withLazyLoading(BpkImage, documentIfExists));
const dateWritten = new Date(2017, 11, 8, 7, 1, 0);

/* eslint-disable max-len */
const Longleat = (props) => {
  const { className, ...rest } = props;
  const classNameFinal = [getClassName('pages__page')];
  if (className) { classNameFinal.push(className); }

  return (
    <main className={classNameFinal.join(' ')} {...rest} >
      <Section name="Longleat 🦁 Christmas 2017" >
          Just after Christmas, we headed out to Longleat to enjoy their safari, and then their festival of lights in the evening. We visited the festival of lights last year
          and it was incredible so we were looking forward to checking it out again this year.
          <br />
        <br />
        <a href="https://flic.kr/s/aHsktEsk1b" rel="noopener noreferrer" target="_blank">
          <SubSection name="See the full album on Flickr →" link >
            <FadingLazyLoadedImage className={getClassName('pages__image')} altText="Longleat Festival of Light" width={2514} height={1676} src={longleatLight} />
          </SubSection>
        </a>
      </Section>
      <Comments pageId={PAGE_ID} />
    </main>
  );
};

Longleat.propTypes = {
  className: PropTypes.string,
};

Longleat.defaultProps = {
  className: null,
};

export default Longleat;
