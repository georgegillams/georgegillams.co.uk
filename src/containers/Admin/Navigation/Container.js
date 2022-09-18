import React from 'react';
import PropTypes from 'prop-types';
import PageTitle from 'components/common/PageTitle';
import { DebugObject } from 'components/common/DebugObject';
import LoadingCover from '@george-gillams/components/loading-cover';
import { FEATURE_CARD_LAYOUTS } from '@george-gillams/components/feature-card';
import { setPostLoginRedirect } from 'client-utils/common/storageHelpers';

import Skeleton from './Skeleton';

import { AdminOnly } from 'components/common/Walls';
import { CardContainer, StyledFeatureCard } from './admin-navigation.styles';
import PageContainer from '@george-gillams/components/page-container';

const AdminNavigation = props => {
  const {
    authenticatorState,

    className,
  } = props;
  const { user } = authenticatorState;

  const outerClassNames = [];

  if (className) {
    outerClassNames.push(className);
  }

  const page = (
    <PageContainer className={outerClassNames.join(' ')}>
      <AdminOnly
        user={user}
        setLoginRedirect={() => {
          setPostLoginRedirect('admin');
        }}>
        <PageTitle name="Admin">
          <CardContainer>
            <StyledFeatureCard
              layout={FEATURE_CARD_LAYOUTS.narrowCompact}
              day={null}
              month={null}
              href="/debug"
              title="Debug"
            />
            <StyledFeatureCard
              layout={FEATURE_CARD_LAYOUTS.narrowCompact}
              day={null}
              month={null}
              href="/admin/analytics"
              title="Analytics"
            />
            <StyledFeatureCard
              layout={FEATURE_CARD_LAYOUTS.narrowCompact}
              day={null}
              month={null}
              href="/admin/emails"
              title="Emails"
            />
            <StyledFeatureCard
              layout={FEATURE_CARD_LAYOUTS.narrowCompact}
              day={null}
              month={null}
              href="/admin/notifications"
              title="Notifications"
            />
            <StyledFeatureCard
              layout={FEATURE_CARD_LAYOUTS.narrowCompact}
              day={null}
              month={null}
              href="/admin/users"
              title="Users"
            />
          </CardContainer>
        </PageTitle>
      </AdminOnly>
    </PageContainer>
  );

  return (
    <>
      <LoadingCover
        loadingSkeleton={Skeleton}
        loading={authenticatorState.user === undefined}
        error={!!authenticatorState.loadAuthError}>
        {page}
      </LoadingCover>
      <DebugObject debugTitle="Admin" debugObject={{ authenticatorState }} />
    </>
  );
};

AdminNavigation.propTypes = {
  authenticatorState: PropTypes.shape({
    user: PropTypes.object,
    loadAuthError: PropTypes.object,
  }).isRequired,
  className: PropTypes.string,
};

AdminNavigation.defaultProps = {
  className: null,
};

export default AdminNavigation;
