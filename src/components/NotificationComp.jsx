import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BpkIconClose from 'bpk-component-icon/lg/close';
import BpkIconMenu from 'bpk-component-icon/lg/menu';
import Logo from './Logo';
import NavigationItem from './NavigationItem';
import SubSection from './SubSection';
import BlogPreviewContent from './BlogPreviewContent';
import DatabaseFunctions from '../DatabaseFunctions';

import STYLES from './notification-center.scss';
import TYPO_STYLES from './typography.scss';

const getClassName = className =>
  STYLES[className] || TYPO_STYLES[className] || 'UNKNOWN';

export const NOTIFICATION_TYPES = {
  neutral: 'neutral',
  success: 'success',
  warn: 'warn',
  error: 'error',
};

class NotificationComp extends Component {
  render() {
    const { type, children, className, ...rest } = this.props;
    const notificationClassName = [
      getClassName('notification-center__notification'),
    ];
    const elementClassName = [getClassName('notification-center__element')];

    if (type === 'neutral') {
      notificationClassName.push(
        getClassName('notification-center__notification--neutral'),
      );
      elementClassName.push(
        getClassName('notification-center__element--neutral'),
      );
    }
    if (type === 'success') {
      notificationClassName.push(
        getClassName('notification-center__notification--success'),
      );
      elementClassName.push(
        getClassName('notification-center__element--success'),
      );
    }
    if (type === 'warn') {
      notificationClassName.push(
        getClassName('notification-center__notification--warn'),
      );
      elementClassName.push(getClassName('notification-center__element--warn'));
    }
    if (type === 'error') {
      notificationClassName.push(
        getClassName('notification-center__notification--error'),
      );
      elementClassName.push(
        getClassName('notification-center__element--error'),
      );
    }

    if (className) {
      className.push(className);
    }

    return (
      <div className={notificationClassName.join(' ')}>
        <BlogPreviewContent
          elementClassName={elementClassName.join(' ')}
          content={children}
        />
      </div>
    );
  }
}

NotificationComp.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.node,
};

NotificationComp.defaultProps = {
  className: null,
  type: 'neutral',
  children: null,
};

export default NotificationComp;
