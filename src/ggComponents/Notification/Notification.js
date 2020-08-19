import React from 'react';
import PropTypes from 'prop-types';

import { cssModules } from '../helpers/cssModules';
import { ThemeProvider, THEMES } from '../Theming';

import STYLES from './notification-comp.module.scss';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

export const NOTIFICATION_TYPES = {
  neutral: 'neutral',
  success: 'success',
  warn: 'warn',
  error: 'error',
};

const Notification = props => {
  const { type, deleted, children, className, ...rest } = props;

  const notificationClassName = [getClassName('notification-comp__notification')];
  const elementClassName = [getClassName('notification-comp__element')];

  if (type === 'neutral') {
    notificationClassName.push(getClassName('notification-comp__notification--neutral'));
    elementClassName.push(getClassName('notification-comp__element--neutral'));
  }
  if (type === 'success') {
    notificationClassName.push(getClassName('notification-comp__notification--success'));
    elementClassName.push(getClassName('notification-comp__element--success'));
  }
  if (type === 'warn') {
    notificationClassName.push(getClassName('notification-comp__notification--warn'));
    elementClassName.push(getClassName('notification-comp__element--warn'));
  }
  if (type === 'error') {
    notificationClassName.push(getClassName('notification-comp__notification--error'));
    elementClassName.push(getClassName('notification-comp__element--error'));
  }

  if (className) {
    notificationClassName.push(className);
  }

  return (
    <ThemeProvider value={{ theme: THEMES.allWhite }}>
      <div className={notificationClassName.join(' ')} {...rest}>
        {children}
      </div>
    </ThemeProvider>
  );
};

Notification.propTypes = {
  className: PropTypes.string,
  deleted: PropTypes.bool,
  type: PropTypes.string,
  children: PropTypes.node,
};

Notification.defaultProps = {
  className: null,
  deleted: false,
  type: 'neutral',
  children: null,
};
export default Notification;
