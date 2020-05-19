import React, { useState } from 'react';
import AdminNotificationEdit from 'containers/AdminNotificationEdit/Loadable';
import { Card } from 'gg-components/Cards';

import { NotificationComp } from 'gg-components/Notifications';
import { Button } from 'gg-components/Button';
import {
  STRING_REGEX,
  INT_REGEX,
  EMAIL_REGEX,
  NAME_REGEX,
  PASSWORD_REGEX,
  DECIMAL_REGEX,
} from 'helpers/constants';
import {
  DebugObject,
  APIEntity,
  AdminOnly,
  LoadingCover,
} from 'gg-components/Auth';
import STYLES from 'containers/pages.scss';

const NotificationEntity = props => {
  const { entity, onNotificationUpdateSuccess, children } = props;
  const [editing, setEditing] = useState(false);

  return (
    <Card>
      <APIEntity name="more" entityType="Notification" entity={entity} />
      <NotificationComp
        style={{ width: '100%' }}
        type={entity.type}
        deleted={entity.deleted}
      >
        {entity.message}
      </NotificationComp>
      <br />
      <br />
      {editing && (
        <AdminNotificationEdit
          id={entity.id}
          onNotificationUpdateSuccess={() => {
            onNotificationUpdateSuccess();
            setTimeout(() => {
              setEditing(false);
            }, 500);
          }}
        />
      )}
      <br />
      <br />
      <Button
        large
        onClick={() => {
          setEditing(!editing);
        }}
      >
        {editing ? 'Cancel edit' : 'Edit notification'}
      </Button>
      {children && children}
    </Card>
  );
};

export default NotificationEntity;
