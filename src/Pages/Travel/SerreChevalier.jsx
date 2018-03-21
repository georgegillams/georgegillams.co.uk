import React from 'react';
import PropTypes from 'prop-types';
import BpkImage, {
  withLazyLoading,
  withLoadingBehavior,
} from 'bpk-component-image';
import Section from './../../components/Section';
import SubSection from './../../components/SubSection';
import LicenseInfo from '../../components/LicenseInfo';
import Comments from '../../components/Comments';
import PageSwitchScroller from '../../components/PageSwitchScroller';
import serreChevalier from './images/serreChevalier.jpg';

import STYLES from '../pages.scss';

const PAGE_ID = 909183;

const getClassName = className => STYLES[className] || 'UNKNOWN';
const documentIfExists = typeof window !== 'undefined' ? document : null;
const FadingLazyLoadedImage = withLoadingBehavior(
  withLazyLoading(BpkImage, documentIfExists),
);

const SerreChevalier = props => {
  const { className, ...rest } = props;
  const classNameFinal = [getClassName('pages__page')];
  if (className) {
    classNameFinal.push(className);
  }

  return (
    <main className={classNameFinal.join(' ')} {...rest}>
      <PageSwitchScroller />
      <Section name="Serre Chevalier ⛷ March 2017">
        <br />
        <br />
        <a
          className={getClassName('pages__link')}
          href="https://flic.kr/s/aHsmcGwW7o"
          rel="noopener noreferrer"
          target="_blank"
        >
          <SubSection noAnchor name="See the full album on Flickr →" link>
            <FadingLazyLoadedImage
              className={getClassName('pages__image')}
              altText="Skiing in Serre Chevalier"
              width={3000}
              height={2000}
              src={serreChevalier}
            />
          </SubSection>
        </a>
      </Section>
      <LicenseInfo centered />
      <Comments pageId={PAGE_ID} />
    </main>
  );
};

SerreChevalier.propTypes = {
  className: PropTypes.string,
};

SerreChevalier.defaultProps = {
  className: null,
};

export default SerreChevalier;
