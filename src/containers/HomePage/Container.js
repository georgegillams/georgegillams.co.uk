import React from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'ggComponents/helpers/cssModules';
import FeatureCard, { FEATURE_CARD_LAYOUTS } from 'components/common/FeatureCard';

import AboutPage from 'containers/About';
import STYLES from './home.module.scss';
import CompactCardSkeleton from 'ggComponents/Skeletons/CompactCardSkeleton';

const getClassName = cssModules(STYLES);

const HomePage = props => {
  const { authenticatorState } = props;
  const { user } = authenticatorState;

  const userLoaded = user !== undefined;

  return (
    <>
      <AboutPage className={getClassName('home__about')} />
      <div className={getClassName('home__card-container')}>
        <FeatureCard
          layout={FEATURE_CARD_LAYOUTS.narrowCompact}
          day={null}
          month={null}
          className={getClassName('home__card')}
          // fillImageSrc="https://i.imgur.com/3n68rkf.jpg"
          href="/blog"
          title="Blog"
        />
        <FeatureCard
          layout={FEATURE_CARD_LAYOUTS.narrowCompact}
          day={null}
          month={null}
          className={getClassName('home__card')}
          // fillImageSrc="https://i.imgur.com/mCmmM4N.jpg"
          href="/travel"
          title="Travel"
        />
        <FeatureCard
          layout={FEATURE_CARD_LAYOUTS.narrowCompact}
          day={null}
          month={null}
          className={getClassName('home__card')}
          // fillImageSrc="https://i.imgur.com/mCmmM4N.jpg"
          href="/photography"
          title="Photography"
        />
        <FeatureCard
          layout={FEATURE_CARD_LAYOUTS.narrowCompact}
          day={null}
          month={null}
          className={getClassName('home__card')}
          // fillImageSrc="https://i.imgur.com/mCmmM4N.jpg"
          href="/work"
          title="Work"
        />
        <FeatureCard
          layout={FEATURE_CARD_LAYOUTS.narrowCompact}
          day={null}
          month={null}
          className={getClassName('home__card')}
          // fillImageSrc="https://i.imgur.com/iFbPZbn.jpg"
          href="/contact"
          title="Contact"
        />
        {!userLoaded && <CompactCardSkeleton />}
        {!user && userLoaded && (
          <FeatureCard
            layout={FEATURE_CARD_LAYOUTS.narrowCompact}
            day={null}
            month={null}
            className={getClassName('home__card')}
            // fillImageSrc="https://i.imgur.com/3n68rkf.jpg"
            href="/login"
            title="Sign in"
          />
        )}
        {user && userLoaded && (
          <FeatureCard
            layout={FEATURE_CARD_LAYOUTS.narrowCompact}
            day={null}
            month={null}
            className={getClassName('home__card')}
            // fillImageSrc="https://i.imgur.com/3n68rkf.jpg"
            href="/account"
            title="Account"
          />
        )}
        {user && userLoaded && user.admin && (
          <FeatureCard
            layout={FEATURE_CARD_LAYOUTS.narrowCompact}
            day={null}
            month={null}
            className={getClassName('home__card')}
            // fillImageSrc="https://i.imgur.com/iFbPZbn.jpg"
            href="/admin"
            title="Admin area"
          />
        )}
      </div>
    </>
  );
};

HomePage.propTypes = {
  authenticatorState: PropTypes.shape({
    user: PropTypes.object,
  }).isRequired,
};

export default HomePage;
