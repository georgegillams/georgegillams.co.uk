import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { load } from 'redux/modules/notifications';
import NotificationComp from './NotificationComp';
import { cssModules } from 'bpk-react-utils';

import STYLES from './notification-center.scss';
// import TYPO_STYLES from '../Typography/typography.scss';

const getClassName = cssModules(STYLES);

@connect(
  state => ({
    newDataAvailable: state.sessions.newDataAvailable,
    notifications: state.notifications.data
  }),
  dispatch => bindActionCreators({ load }, dispatch)
)
export default class NotificationCentre extends Component {
  static propTypes = {
    newDataAvailable: PropTypes.bool.isRequired,
    notifications: PropTypes.arrayOf(PropTypes.object),
    load: PropTypes.func.isRequired,
    className: PropTypes.string
  };

  static defaultProps = {
    className: null
  };

  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    this.interval = setInterval(this.reloadNotificationsIfNecessary, 500);
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  reloadNotificationsIfNecessary = () => {
    if (this.props.newDataAvailable) {
      this.props.load();
    }
  };

  render() {
    const { notifications, load, className, ...rest } = this.props; // eslint-disable-line no-shadow

    if (!notifications || notifications.length < 1) {
      return null;
    }

    const outerClassNameFinal = [
      getClassName('notification-center__container')
    ];

    if (className) {
      outerClassNameFinal.push(className);
    }
    return (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        {notifications.map(notif => (
          <NotificationComp
            className={getClassName('notification-center__notification')}
            type={notif.type}
            deleted={notif.deleted}
          >
            {notif.message}
          </NotificationComp>
        ))}
      </div>
    );
  }
}
