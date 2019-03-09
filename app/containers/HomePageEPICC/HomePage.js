import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import ArticleCard, { CARD_LAYOUTS } from 'components/Cards';
import 'containers/pages.scss';

const getClassName = c => c;

export default class HomePage extends React.PureComponent {
  componentDidMount() {}

  render() {
    const { user } = this.props;

    return (
      <div className={getClassName('pages__container')}>
        <div className={getClassName('pages__compact-card-container')}>
          <Helmet title="Home" />
          <ArticleCard
            layout={CARD_LAYOUTS.narrowCompact}
            day={null}
            month={null}
            className={getClassName('pages__card')}
            // fillImageSrc="https://i.imgur.com/3n68rkf.jpg"
            linkUrl="/login"
            title="Log in"
            tallLayout
          />
          <ArticleCard
            layout={CARD_LAYOUTS.narrowCompact}
            day={null}
            month={null}
            className={getClassName('pages__card')}
            // fillImageSrc="https://i.imgur.com/3n68rkf.jpg"
            linkUrl="/sign-up"
            title="Sign up"
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
          {user && user.admin && (
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

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  onChangeUsername: PropTypes.func,
};
