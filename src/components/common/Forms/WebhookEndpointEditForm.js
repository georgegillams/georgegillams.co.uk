import React from 'react';
import PropTypes from 'prop-types';
import FormBuilder, { FORM_FIELD_VISIBILITY } from '@george-gillams/components/form-builder';

const WebhookEndpointEditForm = props => {
  const { isNew, webhookEndpoint, onDataChanged, ...rest } = props;

  return (
    <FormBuilder
      onDataChanged={onDataChanged}
      entity={webhookEndpoint}
      submitLabel="Update"
      formFields={[
        {
          id: 'name',
          name: 'Name',
        },
        {
          id: 'requestedId',
          name: 'Requested ID',
          visibility: isNew ? FORM_FIELD_VISIBILITY.VISIBLE : FORM_FIELD_VISIBILITY.OFF,
        },
        {
          id: 'retentionLimit',
          name: 'Retention limit',
        },
        {
          id: 'accessKey',
          name: 'Access key',
          visibility: isNew ? FORM_FIELD_VISIBILITY.OFF : FORM_FIELD_VISIBILITY.VISIBLE,
        },
      ]}
      test={process.env.NODE_ENV === 'test'}
      {...rest}
    />
  );
};

WebhookEndpointEditForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  webhookEndpoint: PropTypes.object.isRequired,
  onDataChanged: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isNew: PropTypes.bool,
};

WebhookEndpointEditForm.defaultProps = {
  isNew: false,
};

export default WebhookEndpointEditForm;
