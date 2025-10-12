import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/common/Button';
import Paragraph from '@george-gillams/components/paragraph';
import { spacingBase } from '@george-gillams/components/constants/layout';

const ImageUploadForm = props => {
  const { image, onDataChanged, onSubmit, loading, submitLabel } = props;

  const handleTitleChange = e => {
    onDataChanged({
      ...image,
      title: e.target.value,
    });
  };

  const handleFileChange = e => {
    const file = e.target.files[0];
    onDataChanged({
      ...image,
      image: file,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (image.title && image.image) {
      onSubmit();
    }
  };

  const isFormValid = image.title && image.image;

  return (
    <form onSubmit={handleSubmit}>
      <Paragraph>
        <label htmlFor="title" style={{ display: 'block', marginBottom: spacingBase }}>
          Title:
        </label>
        <input
          id="title"
          type="text"
          value={image.title}
          onChange={handleTitleChange}
          placeholder="Enter image title"
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            marginBottom: spacingBase,
          }}
          required
        />
      </Paragraph>

      <Paragraph>
        <label htmlFor="image" style={{ display: 'block', marginBottom: spacingBase }}>
          Image file (JPEG or PNG):
        </label>
        <input
          id="image"
          type="file"
          accept="image/jpeg,image/jpg,image/png"
          onChange={handleFileChange}
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            marginBottom: spacingBase,
          }}
          required
        />
        {image.image && (
          <div style={{ marginTop: spacingBase }}>
            <strong>Selected file:</strong> {image.image.name}
            <br />
            <strong>Size:</strong> {Math.round(image.image.size / 1024)} KB
            <br />
            <strong>Type:</strong> {image.image.type}
          </div>
        )}
      </Paragraph>

      <Button type="submit" loading={loading} disabled={!isFormValid || loading} style={{ marginTop: spacingBase }}>
        {submitLabel}
      </Button>
    </form>
  );
};

ImageUploadForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  image: PropTypes.object.isRequired,
  onDataChanged: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  submitLabel: PropTypes.string,
};

ImageUploadForm.defaultProps = {
  loading: false,
  submitLabel: 'Upload',
};

export default ImageUploadForm;
