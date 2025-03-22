import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import PageTitle from 'components/common/PageTitle';
import DebugObject from 'components/common/DebugObject';
import LoadingCover from '@george-gillams/components/loading-cover';
import Button from 'components/common/Button';
import { AdminOnly } from 'components/common/Walls';
import { setPostLoginRedirect } from 'client-utils/common/storageHelpers';
import Skeleton from './Skeleton';
import { withRouter } from 'next/router';
import ErrorDisplay from 'components/common/ErrorDisplay';
import { BUTTON_TYPES } from '@george-gillams/components/button/constants';

import useTabMadeVisible from 'client-utils/common/useTabMadeVisible';
import { VStack } from 'components/common/Stacks';
import { useEffectOnce } from 'react-use';
import WebhookEndpointEntity from './WebhookEndpointEntity';
import Paragraph from '@george-gillams/components/paragraph';
import SplitDetailView, { SplitDetailItem } from 'components/common/SplitDetailView';
import Subsection from '@george-gillams/components/subsection';
import WebhookEndpointEditForm from 'components/common/Forms/WebhookEndpointEditForm';

const AdminWebhooks = props => {
  const {
    loadEndpoints,
    removeEndpoint,

    createEndpoint,
    updateEndpoint,

    loadNotifications,
    removeNotification,

    webhooksState,
    authenticatorState,

    router,
  } = props;

  const { loadError, webhookEndpoints } = webhooksState;
  const { user } = authenticatorState;

  const [highlightId, setHighlightId] = useState(null);
  const [highlightToScrollTo, setHighlightToScrollTo] = useState(null);
  const [newWebhookEndpoint, setNewWebhookEndpoint] = useState({});

  useTabMadeVisible(loadEndpoints);

  useEffectOnce(() => {
    loadEndpoints();
  });

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

  const firstPageHitDone = useRef(false);

  useEffect(() => {
    if (!router || !router.query || !router.query.highlight) {
      setHighlightId(null);
      firstPageHitDone.current = true;
      return;
    }

    const highlight = router.query.highlight;
    setHighlightId(highlight);
    if (!firstPageHitDone.current) {
      setHighlightToScrollTo(highlight);
      firstPageHitDone.current = true;
    }
  }, [router]);

  useEffect(() => {
    scrollToHighlightedId();
  });

  useEffect(() => {
    loadNotifications(highlightId);
  }, [loadNotifications, highlightId]);

  const showWebhookEndpoints = !!webhookEndpoints && !!webhookEndpoints.map && webhookEndpoints.length > 0;

  const listView = (
    <VStack>
      <SplitDetailItem scroll={false} highlighted={highlightId === 'new'} href="/admin/webhooks?highlight=new">
        <Subsection name="New +" anchor={false} padding={false} />
      </SplitDetailItem>
      {showWebhookEndpoints &&
        webhookEndpoints.map(n => (
          <WebhookEndpointEntity
            key={n.id}
            entity={n}
            href={`/admin/webhooks?highlight=${n.id}`}
            highlighted={highlightId === n.id}
            compact={true}
          />
        ))}
    </VStack>
  );

  let detailView = null;
  if (highlightId === 'new') {
    detailView = (
      <Subsection name="New webhook endpoint" anchor={false}>
        <Paragraph style={{ width: '100%' }}>
          <WebhookEndpointEditForm
            isNew
            webhookEndpoint={newWebhookEndpoint}
            onDataChanged={setNewWebhookEndpoint}
            onSubmit={() => {
              createEndpoint(newWebhookEndpoint);
            }}
            loading={webhooksState.creating}
            submitLabel="Create webhook endpoint"
          />
        </Paragraph>
      </Subsection>
    );
  } else {
    const detailWebhookEndpoints = webhooksState?.webhookEndpoints?.filter?.(u => u.id === highlightId);
    const detailWebhookEndpoint =
      detailWebhookEndpoints && detailWebhookEndpoints.length > 0 ? detailWebhookEndpoints[0] : null;

    detailView = !detailWebhookEndpoint ? null : (
      <WebhookEndpointEntity
        key={detailWebhookEndpoint.id}
        entity={detailWebhookEndpoint}
        compact={false}
        webhooksState={webhooksState}
        updateEndpoint={updateEndpoint}
        notifications={webhooksState.notifications?.[detailWebhookEndpoint.id]}
        loadNotifications={loadNotifications}
        removeNotification={removeNotification}>
        <div style={{ width: '100%' }}>
          <br />
          <Button
            buttonType={BUTTON_TYPES.destructive}
            disabled={detailWebhookEndpoint.deleted}
            onClick={() => {
              removeEndpoint(detailWebhookEndpoint);
            }}>
            Remove
          </Button>
        </div>
      </WebhookEndpointEntity>
    );
  }

  return (
    <>
      <LoadingCover
        loadingSkeleton={Skeleton}
        loading={authenticatorState.user === undefined}
        error={authenticatorState.loadAuthError}>
        <AdminOnly
          user={user}
          setLoginRedirect={() => {
            setPostLoginRedirect('admin/webhooks');
          }}>
          <PageTitle link={{ to: '/admin', text: 'Admin' }} name="Admin webhooks" />
          <Paragraph>
            <Button loading={webhooksState.loading} onClick={() => loadEndpoints()}>
              Reload webhooks
            </Button>
          </Paragraph>
          <VStack topPadding>
            <ErrorDisplay message="Could not load webhooks" error={loadError} />
            <SplitDetailView listView={listView} detailView={detailView} closeLink="/admin/webhooks" />
          </VStack>
        </AdminOnly>
      </LoadingCover>
      <DebugObject
        debugTitle="AdminWebhooks"
        debugObject={{
          loadEndpoints,
          notificationsState: webhooksState,
          authenticatorState,
        }}
      />
    </>
  );
};

AdminWebhooks.propTypes = {
  loadEndpoints: PropTypes.func.isRequired,
  createEndpoint: PropTypes.func.isRequired,
  updateEndpoint: PropTypes.func.isRequired,
  removeEndpoint: PropTypes.func.isRequired,
  webhooksState: PropTypes.shape({
    loading: PropTypes.bool,
    creating: PropTypes.bool,
    loadError: PropTypes.object,
    webhookEndpoints: PropTypes.arrayOf(PropTypes.object),
    notifications: PropTypes.object,
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
  loadNotifications: PropTypes.func.isRequired,
  removeNotification: PropTypes.func.isRequired,
};

AdminWebhooks.defaultProps = {
  webhooksState: null,
  verificationState: null,
  router: null,
};

export default withRouter(AdminWebhooks);
