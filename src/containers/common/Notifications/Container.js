import React from 'react';
import PropTypes from 'prop-types';
import DebugObject from 'components/common/DebugObject';
import { StyledNotification } from './notifications.styles';
import useTabMadeVisible from 'client-utils/common/useTabMadeVisible';
import { useEffectOnce } from 'react-use';

const Notifications = props => {
  const { load, notificationsState } = props;
  const { notifications } = notificationsState;

  useTabMadeVisible(load);
  useEffectOnce(() => {
    load();
  });

  const filteredNotifications =
    notifications &&
    notifications.filter(n => {
      if (n.deleted) {
        return false;
      }

      if (!n.type || !n.message) {
        return false;
      }

      return true;
    });

  return (
    <>
      {filteredNotifications &&
        filteredNotifications.map(n => (
          <StyledNotification key={n.id} type={n.type}>
            {n.message}
          </StyledNotification>
        ))}
      <div>
        <DebugObject debugTitle="Notifications" debugObject={{ load, notificationsState }} />
      </div>
    </>
  );
};

Notifications.propTypes = {
  load: PropTypes.func.isRequired,
  notificationsState: PropTypes.shape({
    loading: PropTypes.bool,
    loadError: PropTypes.object,
    notifications: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default Notifications;
