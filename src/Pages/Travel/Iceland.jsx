import React from 'react';
import PropTypes from 'prop-types';
import BpkImage, { withLazyLoading, withLoadingBehavior } from 'bpk-component-image';
import Section from './../../components/Section';
import SubSection from './../../components/SubSection';
import Comments from '../../components/Comments';
import iceland0 from './images/iceland0.jpg';
import iceland1 from './images/iceland1.jpg';
import iceland2 from './images/iceland2.jpg';
import iceland3 from './images/iceland3.jpg';

import STYLES from '../pages.scss';

const PAGE_ID = 927581;

const getClassName = className => STYLES[className] || 'UNKNOWN';
const documentIfExists = typeof window !== 'undefined' ? document : null;
const FadingLazyLoadedImage = withLoadingBehavior(withLazyLoading(BpkImage, documentIfExists));

/* eslint-disable max-len */
const Iceland = (props) => {
  const { className, ...rest } = props;
  const classNameFinal = [getClassName('pages__page')];
  if (className) { classNameFinal.push(className); }

  return (
    <main className={classNameFinal.join(' ')} {...rest} >
      <Section name="Iceland  🛥 January 2018" >
          In January we kicked off the year in style by heading to Iceland for 6 nights. We booked the whole package through Iceland Air, which
          made it pretty easy to bolt together an action-packed trip. We stayed in a small no-frills hotel just outside Reykjavik (about a 30 min walk to
          the city center). As well as exploring the city and trying their restuarants, we also fitted in trips to see the Northern Lights by boat, a visit to
          Blue Lagoon, a whale-watching boat trip and a tour of the Golden Circle.
      <br />
        <br />
      Iceland is an incredibly beautiful country, with a lot of natural wonders that you can't see anywhere else. Despite getting food-poinsoning on day 1, it was an awesome
      trip and I'd definitely recommend a visit!
        <br />
        <br />
        <a className={getClassName('pages__link')} href="https://flic.kr/s/aHskqS4GoZ" rel="noopener noreferrer" target="_blank">
          <SubSection name="See the full album on Flickr →" link >
            <FadingLazyLoadedImage className={getClassName('pages__image')} altText="Overlooking the harbour" width={3} height={2} src={iceland2} />
            <FadingLazyLoadedImage className={getClassName('pages__image')} altText="Overlooking the harbour" width={3} height={2} src={iceland1} />
            <FadingLazyLoadedImage className={getClassName('pages__image')} altText="Overlooking the harbour" width={2} height={3} src={iceland3} />
          </SubSection>
        </a>
      </Section>
      <Comments pageId={PAGE_ID} />
    </main>
  );
};

Iceland.propTypes = {
  className: PropTypes.string,
};

Iceland.defaultProps = {
  className: null,
};

export default Iceland;
