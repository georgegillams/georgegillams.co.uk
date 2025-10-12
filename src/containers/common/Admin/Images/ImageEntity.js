import React from 'react';
import PropTypes from 'prop-types';
import { SplitDetailItem } from 'components/common/SplitDetailView';
import Subsection from '@george-gillams/components/subsection';
import Paragraph from '@george-gillams/components/paragraph';
import Button from 'components/common/Button';
import { spacingBase } from '@george-gillams/components/constants/layout';
import { BUTTON_TYPES } from '@george-gillams/components/button';
import CopyButton from '@george-gillams/components/copy-button';
import apiStructure from 'helpers/common/apiStructure';

const ImageEntity = props => {
  const { compact, entity, children, imagesState, removeImage, ...rest } = props;

  if (!entity) {
    return null;
  }

  const imageUrl = `${apiStructure.loadImage.fullPath.replace(':id', entity.id)}`;

  const content = (
    <Subsection anchor={false} padding={!compact} name={entity.title || `Image ${entity.id}`}>
      <Paragraph>
        ID: {entity.id}
        <br />
        Title: {entity.title}
        <br />
        Original name: {entity.originalName}
        <br />
        File size: {entity.size ? `${Math.round(entity.size / 1024)} KB` : 'Unknown'}
        <br />
        MIME type: {entity.mimeType}
        <br />
        Access link: {imageUrl} <CopyButton text={imageUrl} />
        <br />
        Uploaded: {new Date(entity.timestamp).toLocaleString()}
        {!compact && (
          <>
            <br />
            <br />
            <img
              src={imageUrl}
              alt={entity.title}
              style={{
                maxWidth: '300px',
                maxHeight: '200px',
                objectFit: 'contain',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
            />
            <br />
            <br />
            <Button
              buttonType={BUTTON_TYPES.destructive}
              onClick={() => {
                removeImage({ id: entity.id });
              }}
              loading={imagesState.removing}
              style={{ marginTop: spacingBase }}>
              Delete image
            </Button>
          </>
        )}
      </Paragraph>
      {children}
    </Subsection>
  );

  if (compact) {
    return <SplitDetailItem {...rest}>{content}</SplitDetailItem>;
  }

  return <div {...rest}>{content}</div>;
};

ImageEntity.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  entity: PropTypes.object,
  children: PropTypes.node,
  compact: PropTypes.bool,
  imagesState: PropTypes.object,
  removeImage: PropTypes.func,
};

ImageEntity.defaultProps = {
  entity: null,
  children: null,
  compact: false,
  imagesState: {},
  removeImage: () => null,
};

export default ImageEntity;
