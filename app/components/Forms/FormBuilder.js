import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import BpkInput, { INPUT_TYPES } from 'bpk-component-input';
import BpkCheckBox from 'bpk-component-checkbox';
import GGButton from 'components/GGButton';
import { TextLink } from 'components/Typography';

import { EMAIL_REGEX, PASSWORD_REGEX } from 'helpers/constants';
import { formValueChanged } from 'helpers/objects';
import HelperFunctions from 'helpers/HelperFunctions';
import {
  STRING_REGEX,
  INT_REGEX,
  DECIMAL_REGEX,
  SORT_CODE_REGEX,
} from 'helpers/constants';

import './forms.scss';

class FormBuilder extends React.Component {
  static propTypes = {
    entity: PropTypes.object.isRequired,
    onDataChanged: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    submitLabel: PropTypes.string.isRequired,
    presubmitText: PropTypes.string,
    formFields: PropTypes.arrayOf(PropTypes.object).isRequired,
    disabled: PropTypes.bool,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: null,
    disabled: false,
    presubmitText: null,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      className,
      disabled,
      entity,
      onDataChanged,
      onSubmit,
      presubmitText,
      submitLabel,
      formFields,
      ...rest
    } = this.props;

    const classNameFinal = [];
    if (className) classNameFinal.push(className);

    const validity = [];
    for (let i = 0; i < formFields.length; i += 1) {
      const field = formFields[i];
      const fieldId = field.id;
      const fieldName = field.name;
      const fieldRegex = field.validationRegex;
      validity[i] =
        !(entity[fieldId] && entity[fieldId].match) ||
        (!!entity[fieldId] && !!entity[fieldId].match(fieldRegex));
    }

    const filteredFormFields = formFields.filter(
      field =>
        HelperFunctions.includes(Object.keys(field), 'show') && field.show,
    );

    return (
      <div className={classNameFinal.join(' ')} {...rest}>
        {filteredFormFields.map((formField, index) =>
          formField.type === 'CHECKBOX' ? (
            <Fragment>
              <BpkCheckBox
                className="forms__component"
                name={formField.name}
                label={formField.name}
                checked={entity[formField.id]}
                onChange={event =>
                  formValueChanged(entity, formField.id, event, onDataChanged)
                }
                disabled={formField.disabled}
              />
              <br />
            </Fragment>
          ) : (
            <Fragment>
              <label htmlFor={formField.id} className="forms__label">
                {formField.name}
              </label>
              <BpkInput
                className="forms__component"
                id={formField.id}
                name={formField.name}
                value={entity[formField.id]}
                valid={validity[index]}
                onChange={event =>
                  formValueChanged(entity, formField.id, event, onDataChanged)
                }
                disabled={formField.disabled}
                placeholder={formField.name}
              />
            </Fragment>
          ),
        )}
        {presubmitText && (
          <Fragment>
            <div className="forms__component">{presubmitText}</div>
          </Fragment>
        )}
        <GGButton
          className="forms__component"
          large
          onClick={onSubmit}
          disabled={disabled || !validity.every(v => v)}
        >
          {submitLabel}
        </GGButton>
      </div>
    );
  }
}

FormBuilder.propTypes = {
  centered: PropTypes.bool,
  className: PropTypes.string,
};

FormBuilder.defaultProps = {
  centered: false,
  className: null,
};

export default FormBuilder;