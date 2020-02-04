import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { APIEntity } from 'gg-components/dist/Auth';
import { Button } from 'gg-components/dist/Button';
import { Card } from 'gg-components/dist/Cards';
import AdminUserEdit from 'containers/AdminUserEdit/Loadable';

const AdminUsersAPIEntity = props => {
  const { entity, onUserUpdateSuccess, children, ...rest } = props;
  const [editing, setEditing] = useState(false);

  let backgroundColor = null; // red
  if (
    entity.overallRegistrationStatus === 'COMPLETE' &&
    entity.registrationStatus.photoRelease !== 'COMPLETE'
  ) {
    backgroundColor = 'yellow'; // yellow
  } else if (entity.overallRegistrationStatus === 'COMPLETE') {
    backgroundColor = '#b4fcb4'; // green
  } else if (entity.overallRegistrationStatus === 'INCOMPLETE') {
    backgroundColor = '#FFB964'; // orange
  }

  return (
    <Card {...rest}>
      <APIEntity style={{ backgroundColor }} entity={entity} />
      {editing && entity && (
        <AdminUserEdit
          style={{
            width: '100%',
          }}
          id={entity.id}
          testProp="testProp"
          onUserUpdateSuccess={() => {
            onUserUpdateSuccess();
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
        {editing ? 'Cancel edit' : 'Edit user'}
      </Button>
      {children && children}
    </Card>
  );
};

AdminUsersAPIEntity.propTypes = {
  entity: PropTypes.object.isRequired,
};

export default AdminUsersAPIEntity;
