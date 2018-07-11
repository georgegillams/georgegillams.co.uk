import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BpkIconClose from 'bpk-component-icon/lg/close';
import BpkIconMenu from 'bpk-component-icon/lg/menu';
import Logo from './Logo';
import NavigationItem from './NavigationItem';
import SubSection from './SubSection';
import BlogPreviewContent from './BlogPreviewContent';
import DatabaseFunctions from '../DatabaseFunctions';

import STYLES from './notification-comp.scss';
import TYPO_STYLES from './typography.scss';

import { cssModules } from 'bpk-react-utils';
const getClassName = cssModules(STYLES);

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
      getClassName('notification-comp__notification'),
    ];
    const elementClassName = [getClassName('notification-comp__element')];

    if (type === 'neutral') {
      notificationClassName.push(
        getClassName('notification-comp__notification--neutral'),
      );
      elementClassName.push(
        getClassName('notification-comp__element--neutral'),
      );
    }
    if (type === 'success') {
      notificationClassName.push(
        getClassName('notification-comp__notification--success'),
      );
      elementClassName.push(
        getClassName('notification-comp__element--success'),
      );
    }
    if (type === 'warn') {
      notificationClassName.push(
        getClassName('notification-comp__notification--warn'),
      );
      elementClassName.push(getClassName('notification-comp__element--warn'));
    }
    if (type === 'error') {
      notificationClassName.push(
        getClassName('notification-comp__notification--error'),
      );
      elementClassName.push(getClassName('notification-comp__element--error'));
    }

    if (className) {
      notificationClassName.push(className);
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
