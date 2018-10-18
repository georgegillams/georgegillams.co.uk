import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { asyncConnect } from 'redux-async-connect';
import {
  isLoaded as isAuthLoaded,
  load as loadAuth,
  login,
  logout,
  logoutAll,
  requestMagicLink,
} from 'redux/modules/auth';
import { LoginForm, Section, Button } from 'components';
import PersonalDetailsBanner from './HomePageV2Banners/PersonalDetailsBanner';
import homePageBanner from './HomePageV2Banners/homePageBanner';
// import { CounterButton, GithubButton} from 'components';
import { ArticleCard, CARD_LAYOUTS } from 'components';
import HelperFunctions from '../../helpers/HelperFunctions';
import Helmet from 'react-helmet';
import { cssModules } from 'bpk-react-utils';

import STYLES from '../pages.scss';

const getClassName = cssModules(STYLES);

const PersonalDetailsBannerH = homePageBanner(
  PersonalDetailsBanner,
  1200,
  '01',
  {
    start: 4.8,
    welcome: 24.9,
    life: 38.4,
    work: 46.6,
    'photography - dog': 75.6,
    'photography - motorcyclist': 85.1,
    'photography - light': 95.3,
  },
  false,
);

@asyncConnect([
  {
    promise: ({ store: { dispatch, getState } }) => {
      const promises = [];

      if (!isAuthLoaded(getState())) {
        promises.push(dispatch(loadAuth()));
      }

      return Promise.all(promises);
    },
  },
])
@connect(
  state => ({
    user: state.auth.user,
  }),
  dispatch => bindActionCreators({}, dispatch),
)
export default class Home extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = { ie: null, edge: null };
  }

  componentDidMount = () => {
    const { ie, edge } = HelperFunctions.getBrowser(window);
    this.setState({ ie: ie, edge: edge });
  };

  render() {
    const { user } = this.props;

    return (
      <div className={getClassName('pages__container')}>
        <div className={getClassName('pages__compact-card-container')}>
          <Helmet title="Home" />
          {false &&
            !this.state.ie && (
              <div className={getClassName('pages__slider')}>
                <PersonalDetailsBannerH />
              </div>
            )}
          <ArticleCard
            layout={CARD_LAYOUTS.narrowCompact}
            day={null}
            month={null}
            className={getClassName('pages__card')}
            // fillImageSrc="https://i.imgur.com/3n68rkf.jpg"
            linkUrl="/account"
            title="Sign in"
            tallLayout
          />
          <ArticleCard
            layout={CARD_LAYOUTS.narrowCompact}
            day={null}
            month={null}
            className={getClassName('pages__card')}
            // fillImageSrc="https://i.imgur.com/3n68rkf.jpg"
            linkUrl="/blog"
            title="Blog"
            tallLayout
          />
          <ArticleCard
            layout={CARD_LAYOUTS.narrowCompact}
            day={null}
            month={null}
            className={getClassName('pages__card')}
            // fillImageSrc="https://i.imgur.com/mCmmM4N.jpg"
            linkUrl="/travel"
            title="Travel"
            tallLayout
          />
          <ArticleCard
            layout={CARD_LAYOUTS.narrowCompact}
            day={null}
            month={null}
            className={getClassName('pages__card')}
            // fillImageSrc="https://i.imgur.com/mCmmM4N.jpg"
            linkUrl="/photography"
            title="Photography"
            tallLayout
          />
          <ArticleCard
            layout={CARD_LAYOUTS.narrowCompact}
            day={null}
            month={null}
            className={getClassName('pages__card')}
            // fillImageSrc="https://i.imgur.com/mCmmM4N.jpg"
            linkUrl="/work"
            title="Work"
            tallLayout
          />
          <ArticleCard
            layout={CARD_LAYOUTS.narrowCompact}
            day={null}
            month={null}
            className={getClassName('pages__card')}
            // fillImageSrc="https://i.imgur.com/mCmmM4N.jpg"
            linkUrl="/about"
            title="About"
            tallLayout
          />
          <ArticleCard
            layout={CARD_LAYOUTS.narrowCompact}
            day={null}
            month={null}
            className={getClassName('pages__card')}
            // fillImageSrc="https://i.imgur.com/iFbPZbn.jpg"
            linkUrl="/contact"
            title="Contact"
            tallLayout
          />
          {user &&
            user.admin && (
              <ArticleCard
                layout={CARD_LAYOUTS.narrowCompact}
                day={null}
                month={null}
                className={getClassName('pages__card')}
                // fillImageSrc="https://i.imgur.com/iFbPZbn.jpg"
                linkUrl="/admin"
                title="Admin area"
                tallLayout
              />
            )}
        </div>
      </div>
    );
  }
}
