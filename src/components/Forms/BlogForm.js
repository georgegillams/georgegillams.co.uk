import React from 'react';
import PropTypes from 'prop-types';
import FormBuilder from '@george-gillams/components/form-builder';

import { STRING_REGEX, ID_REGEX, ANYTHING_REGEX } from '@george-gillams/webapp/helpers/regexConstants';

const BlogForm = props => {
  const { className, blog, ...rest } = props;

  const classNameFinal = [];
  if (className) classNameFinal.push(className);

  return (
    <FormBuilder
      entity={blog}
      formFields={[
        {
          id: 'requestedId',
          name: 'Requested ID',
          validationRegex: ID_REGEX,
          show: !blog.id,
        },
        {
          id: 'title',
          name: 'Title',
          validationRegex: ANYTHING_REGEX,
          show: true,
        },
        {
          id: 'tags',
          name: 'Tags',
          validationRegex: ANYTHING_REGEX,
          show: true,
        },
        {
          id: 'blogImage',
          name: 'Blog image',
          validationRegex: ANYTHING_REGEX,
          show: true,
        },
        {
          id: 'publishedTimestamp',
          name: 'Published timestamp',
          validationRegex: ANYTHING_REGEX,
          show: true,
        },
        {
          id: 'blogCardDate',
          name: 'Blog card date override',
          validationRegex: ANYTHING_REGEX,
          show: true,
        },
        {
          id: 'light',
          name: 'Light',
          validationRegex: null,
          type: 'CHECKBOX',
          show: true,
        },
        {
          id: 'published',
          name: 'Published',
          validationRegex: null,
          type: 'CHECKBOX',
          show: true,
        },
        {
          id: 'showInBlogsList',
          name: 'Show in blogs list',
          validationRegex: null,
          type: 'CHECKBOX',
          show: true,
        },
        {
          id: 'blogImageBorderColor',
          name: 'Blog image border color',
          validationRegex: STRING_REGEX,
          show: true,
        },
        {
          id: 'content',
          name: 'Content',
          long: true,
          validationRegex: ANYTHING_REGEX,
          show: true,
        },
      ]}
      test={process.env.NODE_ENV === 'test'}
      {...rest}
    />
  );
};

BlogForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  blog: PropTypes.object.isRequired,
  onDataChanged: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  className: PropTypes.string,
};
BlogForm.defaultProps = {
  className: null,
};

export default BlogForm;
