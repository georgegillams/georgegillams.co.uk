import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PageTitle from 'components/common/PageTitle';
import { DebugObject } from 'components/common/DebugObject';
import { LoadingCover } from 'gg-components/LoadingCover';
import { Button } from 'gg-components/Button';
import { Subsection } from 'gg-components/Subsection';
import { Paragraph } from 'gg-components/Paragraph';
import { SplitDetailItem } from 'components/common/SplitDetailView';
import { AdminOnly } from 'components/common/Walls';
import { SplitDetailView } from 'components/common/SplitDetailView';
import { setPostLoginRedirect } from 'utils/common/storageHelpers';
import Skeleton from './Skeleton';
import { withRouter } from 'next/router';
import UserFilter, { filterUsers, defaultFilters } from './UserFilter';
import { UserEditForm } from 'components/common/Forms';
import { Error } from 'gg-components/Error';

import AdminUsersAPIEntity from './AdminUsersAPIEntity';

import { cssModules } from 'gg-components/helpers/cssModules';
import STYLES from './admin-users.scss';
import useTabMadeVisible from 'utils/common/useTabMadeVisible';

const getClassName = cssModules(STYLES);

const AdminUsers = props => {
  const [firstPageHit, setFirstPageHit] = useState(true);
  const [highlightId, setHighlightId] = useState(null);
  const [highlightToScrollTo, setHighlightToScrollTo] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState(defaultFilters);
  const [newUser, setNewUser] = useState({});

  const {
    load,
    remove,
    requestMagicLink,
    update,
    create,

    adminUsersState,
    authenticatorState,

    router,
  } = props;

  const { loadError, users, removing, requesting } = adminUsersState;
  const { user } = authenticatorState;

  useTabMadeVisible(load);

  useEffect(() => {
    load();
  }, []);

  const scrollToHighlightedId = () => {
    if (!highlightToScrollTo) {
      return;
    }

    const scrollToElement = document.getElementById(highlightToScrollTo);
    if (scrollToElement) {
      scrollToElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setHighlightToScrollTo(null);
    }
  };

  useEffect(() => {
    if (!router || !router.query || !router.query.highlight) {
      setHighlightId(null);
      setFirstPageHit(false);
      return;
    }

    const highlight = router.query.highlight;
    setHighlightId(highlight);
    if (firstPageHit) {
      setHighlightToScrollTo(highlight);
      setFirstPageHit(false);
    }
  }, [router]);

  useEffect(() => {
    scrollToHighlightedId();
  });

  let filteredUsers = filterUsers(users, filters);

  const showUsers = !!filteredUsers && !!filteredUsers.length && !!filteredUsers.map;

  const newUserForm = (
    <>
      {adminUsersState && adminUsersState.createError && (
        <>
          <Error>
            <Paragraph>{adminUsersState.createError.errorMessage || 'Something went wrong'}</Paragraph>
          </Error>
          <br />
        </>
      )}

      <UserEditForm
        showAdminControls
        user={newUser}
        onDataChanged={setNewUser}
        onSubmit={() => {
          create(newUser);
        }}
        submitLabel="Create user"
        disabled={adminUsersState.creating}
      />
    </>
  );
  const listView = (
    <div>
      <SplitDetailItem
        scroll={false}
        highlighted={highlightId === 'new'}
        href="/admin/users?highlight=new"
        className={getClassName('admin-users__card')}>
        <Subsection name="New +" anchor={false} noPadding />
      </SplitDetailItem>
      {showUsers &&
        filteredUsers.map(n => (
          <AdminUsersAPIEntity
            key={n.id}
            scroll={false}
            href={`/admin/users?highlight=${n.id}`}
            compact
            entity={n}
            highlighted={highlightId === n.id}
            className={getClassName('admin-users__card')}
          />
        ))}
    </div>
  );
  let detailView = null;
  if (highlightId === 'new') {
    detailView = newUserForm;
  } else {
    const detailUsers = users && users.filter && highlightId ? users.filter(g => g.id === highlightId) : null;
    const detailUser = detailUsers && detailUsers.length > 0 ? detailUsers[0] : null;

    detailView = !detailUser ? null : (
      <AdminUsersAPIEntity
        key={detailUser.id}
        adminUserState={adminUsersState}
        updateUser={update}
        entity={detailUser}
        highlighted={highlightId === detailUser.id}
        onUserUpdateSuccess={() => {
          load();
        }}>
        <br />
        <br />
        <Button
          large
          destructive
          disabled={requesting || removing}
          onClick={() => {
            requestMagicLink(detailUser);
          }}>
          Login as user
        </Button>
        <br />
        <br />
        <Button large destructive disabled={removing} onClick={() => remove(detailUser)}>
          Delete
        </Button>
      </AdminUsersAPIEntity>
    );
  }

  const filtersApplied = filters !== defaultFilters;
  const mainControls = (
    <div>
      <Button
        style={{ marginRight: '1rem', marginBottom: '1rem' }}
        disabled={adminUsersState.loading}
        onClick={() => load()}
        large>
        Reload users
      </Button>
      <Button style={{ marginRight: '1rem', marginBottom: '1rem' }} onClick={() => setShowFilters(!showFilters)} large>
        {showFilters ? 'Hide filters' : 'Show filters'}
      </Button>
      {filtersApplied && (
        <Button style={{ marginBottom: '1rem' }} onClick={() => setFilters(defaultFilters)} large>
          Clear filters
        </Button>
      )}
      <br />
      <br />
    </div>
  );

  const filterControls = <UserFilter filters={filters} onFiltersChanged={setFilters} />;

  return (
    <>
      <LoadingCover
        loadingSkeleton={Skeleton}
        loading={authenticatorState.user === undefined}
        error={authenticatorState.loadAuthError}>
        <AdminOnly
          user={user}
          setLoginRedirect={() => {
            setPostLoginRedirect('admin/users');
          }}>
          <div>
            <PageTitle link={{ to: '/admin', text: 'Admin' }} name="Admin users"></PageTitle>
          </div>
          {mainControls}
          {loadError && (
            <>
              <Paragraph>Could not load users</Paragraph>
              {loadError.errorMessage && (
                <>
                  <br />
                  <Error>
                    <Paragraph>{loadError.errorMessage}</Paragraph>
                  </Error>
                </>
              )}
            </>
          )}
          {showFilters && filterControls}
          {users && (
            <>
              <br />
              <Paragraph>
                Showing {filteredUsers.length} of {users.length} users
              </Paragraph>
              <br />
              <br />
            </>
          )}
          <SplitDetailView
            className={getClassName('admin-users__split-view')}
            listView={listView}
            detailView={detailView}
            closeLink="/admin/users"
          />
        </AdminOnly>
      </LoadingCover>
      <DebugObject
        debugTitle="AdminUsers"
        debugObject={{
          load,
          remove,
          requestMagicLink,
          update,
          create,
          adminUsersState,
          authenticatorState,
        }}
      />
    </>
  );
};

AdminUsers.propTypes = {
  load: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  requestMagicLink: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  create: PropTypes.func.isRequired,
  adminUsersState: PropTypes.shape({
    loading: PropTypes.bool,
    loadError: PropTypes.object,
    users: PropTypes.arrayOf(PropTypes.object),
    removing: PropTypes.bool,
    requesting: PropTypes.bool,
    creating: PropTypes.bool,
    updating: PropTypes.bool,
    createError: PropTypes.object,
    updateError: PropTypes.object,
  }).isRequired,
  authenticatorState: PropTypes.shape({
    user: PropTypes.object,
    loadAuthError: PropTypes.object,
  }).isRequired,
  router: PropTypes.shape({
    query: PropTypes.shape({
      highlight: PropTypes.string,
    }).isRequired,
  }),
};

AdminUsers.defaultProps = {
  adminUsersState: null,
  verificationState: null,
  router: null,
};

export default withRouter(AdminUsers);
