import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import ArticleCard, { CARD_LAYOUTS } from 'components/Cards';
import { Section } from 'components/Typography';
import { DebugObject, AdminOnly, LoadingCover } from 'components/Auth';
import Skeleton from './Skeleton';
import { CookiesOnly } from 'components/Sessions';

import 'containers/pages.scss';

const getClassName = c => c;

export default class Admin extends React.Component {
  render() {
    const {
      user,
      userLoading,
      userLoadError,
      cookiesAllowed,
      onCookiesAccepted,
      className,
      ...rest
    } = this.props;
    const outerClassNameFinal = [getClassName('pages__container')];

    if (className) {
      outerClassNameFinal.push(className);
    }

    const page = (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <AdminOnly user={user}>
          <Section name="Admin">
            <div className={getClassName('pages__compact-card-container')}>
              <ArticleCard
                layout={CARD_LAYOUTS.narrowCompact}
                day={null}
                month={null}
                className={getClassName('pages__card')}
                linkUrl="/admin/users"
                title="Users"
                tallLayout
              />
            </div>
          </Section>
        </AdminOnly>
      </div>
    );

    return (
      <Fragment>
        <Helmet title="Admin" />
        <CookiesOnly
          cookiesAccepted={cookiesAllowed}
          onAccept={onCookiesAccepted}
        />
        <LoadingCover
          loadingSkeleton={Skeleton}
          loading={!cookiesAllowed || userLoading}
          error={userLoadError}
        >
          {page}
        </LoadingCover>
        <DebugObject debugTitle="Admin" debugObject={{}} />
      </Fragment>
    );
  }
}

Admin.propTypes = {
  loggingIn: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  createdPayment: PropTypes.object,
  login: PropTypes.func.isRequired,
  className: PropTypes.string,
};