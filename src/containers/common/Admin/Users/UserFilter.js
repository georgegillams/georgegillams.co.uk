import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import { Input } from 'gg-components/Input';
import { Select } from 'gg-components/Select';
import { Checkbox } from 'gg-components/Checkbox';

const UserFilter = props => {
  const {
    filterDeleted,
    onDeletedFilterChanged,
    filterAdminStatus,
    onAdminStatusFilterChanged,
    filterEmailVerified,
    onEmailVerifiedFilterChanged,
    filterName,
    onNameFilterChanged,
  } = props;

  return (
    <div>
      <Checkbox label="Show deleted" name="filterDeleted" checked={!filterDeleted} onChange={onDeletedFilterChanged} />
      <br />
      <br />
      <label htmlFor="filterAdminStatus">Filter by admin status</label>
      <Select
        id="filterAdminStatus"
        name="Filter by admin status"
        value={filterAdminStatus}
        options={[
          { value: 'all', name: 'All' },
          { value: 'admin', name: 'Admin' },
          { value: 'nonAdmin', name: 'Non-admin' },
        ]}
        onChange={onAdminStatusFilterChanged}
      />
      <br />
      <br />
      <label htmlFor="filterEmailVerified">Filter by email verification status</label>
      <Select
        id="filterEmailVerified"
        name="Filter by email verification status"
        value={filterEmailVerified}
        options={[
          { value: 'all', name: 'All' },
          { value: 'verified', name: 'Verified' },
          { value: 'notVerified', name: 'Non-verified' },
        ]}
        onChange={onEmailVerifiedFilterChanged}
      />
      <br />
      <br />
      <label htmlFor="filterName">Filter by name</label>
      <Input id="filterName" value={filterName} onChange={onNameFilterChanged} />
    </div>
  );
};

UserFilter.propTypes = {
  filterDeleted: PropTypes.bool.isRequired,
  onDeletedFilterChanged: PropTypes.func.isRequired,
  filterAdminStatus: PropTypes.string.isRequired,
  onAdminStatusFilterChanged: PropTypes.func.isRequired,
  filterEmailVerified: PropTypes.string.isRequired,
  onEmailVerifiedFilterChanged: PropTypes.func.isRequired,
  filterName: PropTypes.string.isRequired,
  onNameFilterChanged: PropTypes.func.isRequired,
};

export default withRouter(UserFilter);
