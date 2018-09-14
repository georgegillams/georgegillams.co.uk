import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
  isLoaded as isNotificationsLoaded,
  load as loadNotifications,
} from 'redux/modules/notifications';
import { bindActionCreators } from 'redux';
import { asyncConnect } from 'redux-async-connect';
import {
  AdminOnly,
  Loading,
  TagFilter,
  Button,
  NotificationComp,
} from 'components';
import {
  NON_EMOJI_REGEX,
  CHECK_FOR_NEW_CONTENT_INTERVAL,
} from '../../utils/constants';
import { cssModules } from 'bpk-react-utils';

import STYLES from '../pages.scss';

const getClassName = cssModules(STYLES);

@asyncConnect([
  {
    promise: ({ store: { dispatch, getState } }) => {
      const promises = [];

      if (!isNotificationsLoaded(getState())) {
        promises.push(dispatch(loadNotifications()));
      }
      if (!isAuthLoaded(getState())) {
        promises.push(dispatch(loadAuth()));
      }

      return Promise.all(promises);
    },
  },
])
@connect(
  state => ({
    newDataAvailable: state.sessions.newDataAvailable,
    notifications: state.notifications ? state.notifications.data : null,
    user: state.auth.user,
  }),
  dispatch => bindActionCreators({ loadNotifications }, dispatch),
)
export default class Notifications extends Component {
  static propTypes = {
    newDataAvailable: PropTypes.bool.isRequired,
    notifications: PropTypes.arrayOf(PropTypes.object),
    loadNotifications: PropTypes.func.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: null,
  };

  constructor(props) {
    super(props);

    this.state = { selectedTags: [] };
  }

  componentDidMount = () => {
    this.interval = setInterval(
      this.reloadNotificationsIfNecessary,
      CHECK_FOR_NEW_CONTENT_INTERVAL,
    );
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  reloadNotificationsIfNecessary = () => {
    if (this.props.newDataAvailable) {
      this.props.loadNotifications();
    }
  };

  render() {
    const {
      user,
      notifications,
      loadNotifications,
      className,
      ...rest
    } = this.props; // eslint-disable-line no-shadow

    const outerClassNameFinal = [getClassName('pages__container')];

    if (className) {
      outerClassNameFinal.push(className);
    }

    if (!notifications) {
      return null;
    }

    return (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <Helmet title="Notifications" />
        <AdminOnly user={user}>
          <div>
            {`Notifications: ${notifications.length}`}
            <br />
            <br />
            {notifications &&
              notifications.map(notification => (
                <div>
                  {`Notification id ${notification.id}`}
                  <br />
                  {`Message ${notification.message}`}
                  <br />
                  {`Type ${notification.type}`}
                  <br />
                  {`Author ${notification.authorId}`}
                  <br />
                  {`Created ${notification.timestamp}`}
                  <br />
                  {`Deleted ${notification.deleted}`}
                  <br />
                  <NotificationComp type={notification.type}>
                    {notification.message}
                  </NotificationComp>
                  <br />
                </div>
              ))}
          </div>
        </AdminOnly>
      </div>
    );
  }
}
