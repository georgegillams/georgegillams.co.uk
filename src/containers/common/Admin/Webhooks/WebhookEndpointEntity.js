import React from 'react';
import PropTypes from 'prop-types';
import { SplitDetailItem } from 'components/common/SplitDetailView';
import Subsection from '@george-gillams/components/subsection';
import Paragraph from '@george-gillams/components/paragraph';
import WebhookEndpointEditForm from 'components/common/Forms/WebhookEndpointEditForm';
import Button from 'components/common/Button';
import { spacingBase } from '@george-gillams/components/constants/layout';
import ObjectAsList from '@george-gillams/components/object-as-list';
import { BUTTON_TYPES } from '@george-gillams/components/button';

const WebhookEndpointEntity = props => {
  const { compact, entity, children, webhooksState, updateEndpoint, notifications, removeNotification, ...rest } =
    props;
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
      {notifications && notifications.length > 0 && (
        <Subsection name="Notifications">
          {(entity.displayInReverse ? notifications.reverse() : notifications).map(notification => {
            const { htmlLogs, logs, data } = notification.payload;

            const showHtmlLogs = htmlLogs && htmlLogs.length > 0;
            const showLogs = !showHtmlLogs && logs && logs.length > 0;
            const showData = !!data;

            return (
              <div key={notification.id}>
                <Paragraph style={{ marginBottom: showLogs || showHtmlLogs ? '10rem' : 0 }}>
                  {showHtmlLogs && <div dangerouslySetInnerHTML={{ __html: htmlLogs }} />}
                  {showLogs && <span>{logs}</span>}
                  {showData && <Paragraph>{data}</Paragraph>}
                  <ObjectAsList value={notification.payload} />
                  <Button
                    buttonType={BUTTON_TYPES.destructive}
                    onClick={() => {
                      removeNotification(notification);
                    }}
                    disabled={notification.deleted}>
                    Delete
                  </Button>
                </Paragraph>
              </div>
            );
          })}
        </Subsection>
      )}
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
  notifications: PropTypes.array,
  removeNotification: PropTypes.func,
};

WebhookEndpointEntity.defaultProps = {
  entity: null,
  children: null,
  compact: false,
  webhooksState: {},
  updateEndpoint: () => null,
  notifications: null,
  removeNotification: () => null,
};

export default WebhookEndpointEntity;
