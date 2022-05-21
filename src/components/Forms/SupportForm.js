import React from 'react';
import PropTypes from 'prop-types';
import FormBuilder from '@george-gillams/components/form-builder';

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
          show: !link.id,
        },
        {
          id: 'description',
          name: 'Description',
          validationRegex: ANYTHING_REGEX,
          show: true,
        },
        {
          id: 'url',
          name: 'URL',
          validationRegex: ANYTHING_REGEX,
          show: true,
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
