import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cookie from 'react-cookies';
import BpkIconClose from 'bpk-component-icon/lg/close';
import BpkIconMenu from 'bpk-component-icon/lg/menu';
import Logo from './Logo';
import NavigationItem from './NavigationItem';
import SubSection from './SubSection';
import BlogPreviewContent from './BlogPreviewContent';
import DatabaseFunctions from '../DatabaseFunctions';
import NotificationComp from './NotificationComp';
import Tag from './Tag';

import STYLES from './notification-center.scss';
import TYPO_STYLES from './typography.scss';

const getClassName = className => className;
// STYLES[className] || TYPO_STYLES[className] || 'UNKNOWN';

class NotificationCenter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notifications: null,
    };
  }

  componentDidMount() {
    const getNotifications = () => {
      DatabaseFunctions.getNotifications(this.state.sessionId, results => {
        this.setState({
          notifications: results,
        });
      });
    };

    const reloadCookies = () => {
      this.setState({
        sessionId: cookie.load('sessionId'),
      });
    };

    reloadCookies();
    getNotifications();
    setInterval(reloadCookies, 1000);
    setInterval(getNotifications, 1000);
  }

  render() {
    if (!this.state.notifications || this.state.notifications.length < 1) {
      return null;
    }

    const { className, ...rest } = this.props;
    const outerClassNameFinal = [
      getClassName('notification-center__container'),
    ];

    if (className) {
      outerClassNameFinal.push(className);
    }

    return (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        {this.state.notifications.map(n => (
          <NotificationComp
            className={getClassName('notification-center__notification')}
            type={n.notificationType}
          >
            {n.notificationMessage}
          </NotificationComp>
        ))}
      </div>
    );
  }
}

NotificationCenter.propTypes = {
  className: PropTypes.string,
};

NotificationCenter.defaultProps = {
  className: null,
};

export default NotificationCenter;
