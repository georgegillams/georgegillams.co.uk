import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { cssModules } from 'gg-components/helpers/cssModules';

import Skeleton from './Skeleton';

import { PageTitle } from 'gg-components/Typography';
import { LoadingIndicator } from 'gg-components/LoadingIndicator';
import { ArticleCard, ARTICLE_CARD_LAYOUTS } from 'gg-components/Cards';
import { Button } from 'gg-components/Button';
import { FormBuilder } from 'gg-components/FormBuilder';
import { CodeInline } from 'gg-components/Code';
import Ticket from 'components/Ticket';
import {
  DebugObject,
  APIEntity,
  AdminOnly,
  LoadingCover,
} from 'gg-components/Auth';
import { CreateNotificationForm } from 'components/Forms';
import STYLES from 'containers/pages.scss';
import { EMAIL_REGEX, UNAME_REGEX } from 'helpers/constants';

const getClassName = cssModules(STYLES);

export default class AdminNotificationEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = { newNotification: null };
  }

  componentDidMount = () => {
    const notificationId = this.props.id || this.props.match.params.id;
    if (notificationId) {
      this.props.loadNotification(notificationId);
    }
  };

  render() {
    const {
      id,
      match,
      onNotificationUpdateSuccess,

      setLoginRedirect,
      user,
      userLoading,

      className,

      loadNotification,
      updateNotification,
      notification,
      loadingNotification,
      loadNotificationSuccess,
      loadNotificationError,
      updatingNotification,
      updateNotificationSuccess,
      updateNotificationError,
      ...rest
    } = this.props;
    const outerClassNameFinal = [];

    if (className) {
      outerClassNameFinal.push(className);
    }

    const page = (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <AdminOnly
          user={user}
          setLoginRedirect={() => setLoginRedirect('admin/notification')}
        >
          <PageTitle
            link={{ to: '/admin/notifications', text: 'Notifications' }}
            name={`Edit notification ${notification && notification.id}`}
          >
            <CreateNotificationForm
              notification={this.state.newNotification || notification || {}}
              submitLabel="Update notification"
              onSubmit={() =>
                updateNotification(
                  this.state.newNotification,
                  onNotificationUpdateSuccess,
                )
              }
              onDataChanged={newValue => {
                this.setState({ newNotification: newValue });
              }}
              disabled={updatingNotification || !this.state.newNotification}
            />
          </PageTitle>
        </AdminOnly>
      </div>
    );

    return (
      <Fragment>
        <Helmet title="Admin - edit notification" />
        <LoadingCover
          loadingSkeleton={Skeleton}
          loading={userLoading || loadingNotification}
        >
          {page}
        </LoadingCover>
        <DebugObject
          debugTitle="Admin notification"
          debugObject={{
            id,
            match,
            onNotificationUpdateSuccess,
            setLoginRedirect,
            user,
            userLoading,
            className,
            loadNotification,
            updateNotification,
            notification,
            loadingNotification,
            loadNotificationSuccess,
            loadNotificationError,
            updatingNotification,
            updateNotificationSuccess,
            updateNotificationError,
          }}
        />
      </Fragment>
    );
  }
}

AdminNotificationEdit.propTypes = {
  loggingIn: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  createdPayment: PropTypes.object,
  login: PropTypes.func.isRequired,
  className: PropTypes.string,
};
