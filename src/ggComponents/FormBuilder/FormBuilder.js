/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/destructuring-assignment */
import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import { Button } from '../Button';
import { Input } from '../Input';
import { TextArea } from '../TextArea';
import { Select } from '../Select';
import { Checkbox } from '../Checkbox';
import { cssModules } from '../helpers/cssModules';
import { formValueChanged } from '../helpers/objects';
import HelperFunctions from '../helpers/HelperFunctions';

import STYLES from './forms.module.scss';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

const FormBuilder = props => {
  const [formId] = props.test ? ['FORM_ID'] : useState(Math.random().toString(36).substring(7));

  const {
    className,
    centered,
    disabled,
    entity,
    onDataChanged,
    submitOnChange,
    onSubmit,
    preSubmitText,
    submitLabel,
    formFields,
    test,
    ...rest
  } = props;

  const classNameFinal = [];
  if (className) classNameFinal.push(className);

  const validity = [];
  for (let i = 0; i < formFields.length; i += 1) {
    const field = formFields[i];
    const fieldId = field.id;
    const fieldRegex = field.validationRegex;
    validity[i] =
      !(entity[fieldId] && entity[fieldId].match) || (!!entity[fieldId] && !!entity[fieldId].match(fieldRegex));
  }

  const filteredFormFields = formFields.filter(
    field => HelperFunctions.includes(Object.keys(field), 'show') && field.show
  );

  return (
    <div className={classNameFinal.join(' ')} {...rest}>
      {filteredFormFields.map((formField, index) => (
        <Fragment key={`${formField.id}_${formId}`}>
          {formField.type === 'CHECKBOX' && (
            <>
              <Checkbox
                id={`${formField.id}_${formId}`}
                className={getClassName('forms__component')}
                name={formField.name}
                label={formField.name}
                checked={entity[formField.id]}
                onChange={event => {
                  formValueChanged(entity, formField.id, event, onDataChanged, submitOnChange ? onSubmit : null);
                }}
                disabled={formField.disabled}
              />
              <br />
            </>
          )}
          {!formField.long && formField.type !== 'CHECKBOX' && formField.type !== 'SELECT' && (
            <>
              <label
                htmlFor={`${formField.id}_${formId}`}
                className={getClassName('forms__component', 'forms__component__label')}>
                {formField.name}
              </label>
              <Input
                id={`${formField.id}_${formId}`}
                className={getClassName('forms__component', 'forms__component__text-box')}
                name={formField.name}
                value={entity[formField.id]}
                valid={validity[index]}
                type={formField.type === 'password' ? 'password' : null}
                onChange={event => {
                  formValueChanged(entity, formField.id, event, onDataChanged, submitOnChange ? onSubmit : null);
                }}
                inputProps={formField.inputProps}
                disabled={formField.disabled}
                placeholder={formField.name}
              />
            </>
          )}
          {formField.long && formField.type !== 'CHECKBOX' && formField.type !== 'SELECT' && (
            <>
              <label
                htmlFor={`${formField.id}_${formId}`}
                className={getClassName('forms__component', 'forms__component__label')}>
                {formField.name}
              </label>
              <TextArea
                id={`${formField.id}_${formId}`}
                className={getClassName('forms__component', 'forms__component__text-box')}
                name={formField.name}
                value={entity[formField.id]}
                valid={validity[index]}
                onChange={event => {
                  formValueChanged(entity, formField.id, event, onDataChanged, submitOnChange ? onSubmit : null);
                }}
                inputProps={formField.inputProps}
                disabled={formField.disabled}
                placeholder={formField.name}
              />
            </>
          )}
          {formField.type === 'SELECT' && (
            <>
              <label
                htmlFor={`${formField.id}_${formId}`}
                className={getClassName('forms__component', 'forms__component__label')}>
                {formField.name}
              </label>
              <Select
                id={`${formField.id}_${formId}`}
                className={getClassName('forms__component', 'forms__component__text-box')}
                name={formField.name}
                value={entity[formField.id]}
                valid={validity[index]}
                onChange={event => {
                  formValueChanged(entity, formField.id, event, onDataChanged, submitOnChange ? onSubmit : null);
                }}
                options={formField.options}
                enableOther={formField.enableOther}
                disabled={formField.disabled}
                placeholder={formField.name}
              />
            </>
          )}
        </Fragment>
      ))}
      {preSubmitText && (
        <>
          <div className={getClassName('forms__component')}>{preSubmitText}</div>
        </>
      )}
      {!submitOnChange && (
        <Button
          className={getClassName('forms__component', 'forms__component__button')}
          large
          onClick={onSubmit}
          disabled={disabled || !validity.every(v => v)}>
          {submitLabel}
        </Button>
      )}
    </div>
  );
};

FormBuilder.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  entity: PropTypes.object.isRequired,
  onDataChanged: PropTypes.func,
  onSubmit: PropTypes.func,
  submitLabel: PropTypes.string.isRequired,
  preSubmitText: PropTypes.string,
  formFields: PropTypes.arrayOf(PropTypes.object).isRequired,
  submitOnChange: PropTypes.bool,
  disabled: PropTypes.bool,
  centered: PropTypes.bool,
  test: PropTypes.bool,
  className: PropTypes.string,
};

FormBuilder.defaultProps = {
  className: null,
  onSubmit: null,
  onDataChanged: null,
  submitOnChange: false,
  disabled: false,
  centered: false,
  test: false,
  preSubmitText: null,
};

export default FormBuilder;
