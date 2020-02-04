import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { APIEntity } from 'gg-components/dist/Auth';
import { Button } from 'gg-components/dist/Button';
import AdminUserEdit from 'containers/AdminUserEdit/Loadable';

const AdminUsersAPIEntity = props => {
  const { entity, onChangeComplete, children, ...rest } = props;
  const [editing, setEditing] = useState(false);
  console.log(`entity`, entity);

  let backgroundColor = '#fcb4b4'; // red
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

  const ApiElement = (
    <APIEntity style={{ backgroundColor }} entity={entity} {...rest} />
  );
  console.log(`onChangeComplete 0`, onChangeComplete);
  return (
    <div>
      {ApiElement}
      {editing && entity && (
        <AdminUserEdit
          match={{ params: { id: entity.id } }}
          onChangeComplete={onChangeComplete}
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
    </div>
  );
};

AdminUsersAPIEntity.propTypes = {
  entity: PropTypes.object.isRequired,
};

export default AdminUsersAPIEntity;
