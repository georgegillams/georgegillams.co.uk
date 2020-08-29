import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import { Input } from 'gg-components/Input';
import { Select } from 'gg-components/Select';
import { Checkbox } from 'gg-components/Checkbox';

const filterUsers = (users, filters) => {
  let filteredUsers = users;
  if (filteredUsers && filteredUsers.filter) {
    if (filters.filterDeleted) {
      filteredUsers = filteredUsers.filter(x => !x.deleted);
    }
    if (filters.filterAdminStatus && filters.filterAdminStatus !== 'all') {
      filteredUsers = filteredUsers.filter(x => {
        if (x.admin && filters.filterAdminStatus === 'admin') {
          return true;
        }
        if (!x.admin && filters.filterAdminStatus === 'nonAdmin') {
          return true;
        }
        return false;
      });
    }
    if (filters.filterEmailVerified && filters.filterEmailVerified !== 'all') {
      filteredUsers = filteredUsers.filter(x => {
        if (x.emailVerified && filters.filterEmailVerified === 'verified') {
          return true;
        }
        if (!x.emailVerified && filters.filterEmailVerified === 'notVerified') {
          return true;
        }
        return false;
      });
    }
    if (filters.filterName) {
      filteredUsers = filteredUsers.filter(x => x.name && x.name.includes(filters.filterName));
    }
  }
  return filteredUsers;
};

const UserFilter = props => {
  const { filters, onFiltersChanged } = props;
  const { filterDeleted, filterAdminStatus, filterEmailVerified, filterName } = filters;

  const onDeletedFilterChanged = event => {
    onFiltersChanged({ ...filters, filterDeleted: !event.target.checked });
  };

  const onAdminStatusFilterChanged = event => {
    onFiltersChanged({ ...filters, filterAdminStatus: event.target.value });
  };

  const onEmailVerifiedFilterChanged = event => {
    onFiltersChanged({ ...filters, filterEmailVerified: event.target.value });
  };

  const onNameFilterChanged = event => {
    onFiltersChanged({ ...filters, filterName: event.target.value });
  };

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
  filters: PropTypes.object.isRequired,
  onFiltersChanged: PropTypes.func.isRequired,
};

export default withRouter(UserFilter);
export { filterUsers };
