import React from 'react';
import PropTypes from 'prop-types';
import FormBuilder, { FORM_FIELD_VISIBILITY } from '@george-gillams/components/form-builder';

import { ANYTHING_REGEX } from '@george-gillams/webapp/helpers/regexConstants';

const SupportForm = props => {
  const { className, link, ...rest } = props;

  const classNameFinal = [];
  if (className) classNameFinal.push(className);

  return (
    <FormBuilder
      entity={link}
      formFields={[
        {
          id: 'name',
          name: 'Name',
          validationRegex: ANYTHING_REGEX,
          visibility: !link.id ? FORM_FIELD_VISIBILITY.VISIBLE : FORM_FIELD_VISIBILITY.HIDDEN,
        },
        {
          id: 'description',
          name: 'Description',
          validationRegex: ANYTHING_REGEX,
        },
        {
          id: 'url',
          name: 'URL',
          validationRegex: ANYTHING_REGEX,
        },
      ]}
      submitLabel="Add link"
      test={process.env.NODE_ENV === 'test'}
      {...rest}
    />
  );
};

SupportForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  link: PropTypes.object.isRequired,
  onDataChanged: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  className: PropTypes.string,
};

SupportForm.defaultProps = {
  className: null,
};

export default SupportForm;
