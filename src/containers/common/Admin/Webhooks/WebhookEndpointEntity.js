import React from 'react';
import PropTypes from 'prop-types';
import { SplitDetailItem } from 'components/common/SplitDetailView';
import Subsection from '@george-gillams/components/subsection';
import Paragraph from '@george-gillams/components/paragraph';
import WebhookEndpointEditForm from 'components/common/Forms/WebhookEndpointEditForm';
import Button from 'components/common/Button';
import { spacingBase } from '@george-gillams/components/constants/layout';

const WebhookEndpointEntity = props => {
  const { compact, entity, children, webhooksState, updateEndpoint, ...rest } = props;
  const [updatedWebhookEndpoint, setUpdatedWebhookEndpoint] = React.useState(entity);
  const [editing, setEditing] = React.useState(false);

  if (!entity) {
    return null;
  }

  const content = (
    <Subsection anchor={false} padding={!compact} name={entity.name || `Webhook ${entity.id}`}>
      {/* TODO: Remove this */}
      <Paragraph>
        id: {entity.id}
        {!compact && (
          <>
            {entity.deleted && (
              <>
                <br />
                DELETED
              </>
            )}
            <br />
            Retention limit: {entity.retentionLimit}
            <br />
            <br />
            Receive URL: {entity.receiveUrl}
            <br />
            <br />
            Headers:
            <br />
            access-key: {entity.accessKey}
          </>
        )}
      </Paragraph>
      {!compact && (
        <div>
          <Button
            style={{ marginBottom: spacingBase, marginTop: spacingBase }}
            onClick={() => {
              setEditing(!editing);
            }}>
            {editing ? 'Cancel edit' : 'Edit webhook endpoint'}
          </Button>
        </div>
      )}
      {editing && (
        <WebhookEndpointEditForm
          webhookEndpoint={updatedWebhookEndpoint}
          onDataChanged={setUpdatedWebhookEndpoint}
          onSubmit={() => {
            updateEndpoint(updatedWebhookEndpoint);
          }}
          loading={webhooksState.updating}
          submitLabel="Update webhook endpoint"
        />
      )}
      {children}
    </Subsection>
  );

  if (compact) {
    return <SplitDetailItem {...rest}>{content}</SplitDetailItem>;
  }

  return <div {...rest}>{content}</div>;
};

WebhookEndpointEntity.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  entity: PropTypes.object,
  children: PropTypes.node,
  compact: PropTypes.bool,
  webhooksState: PropTypes.object,
  updateEndpoint: PropTypes.func,
};

WebhookEndpointEntity.defaultProps = {
  entity: null,
  children: null,
  compact: false,
  webhooksState: {},
  updateEndpoint: () => null,
};

export default WebhookEndpointEntity;
