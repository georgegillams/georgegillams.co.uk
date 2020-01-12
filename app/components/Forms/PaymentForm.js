import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'gg-components/dist/Input';
import { Button } from 'gg-components/dist/Button';
import { Section } from 'gg-components/dist/Typography';
import {
  injectStripe,
  CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement,
  PaymentRequestGGButtonElement,
  IbanElement,
  IdealBankElement,
} from 'react-stripe-elements';

import {
  STRING_REGEX,
  INT_REGEX,
  EMAIL_REGEX,
  PASSWORD_REGEX,
  DECIMAL_REGEX,
  CARD_NUMBER_REGEX,
  CVV_REGEX,
  EXPIRY_REGEX,
  NAME_REGEX,
  TICKET_COST,
} from 'helpers/constants';

import { FormBuilder } from 'gg-components/dist/FormBuilder';

import './forms.scss';

class SignUpContinueFormPayment extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    userDetails: PropTypes.object.isRequired,
    onDataChanged: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  submit = () => {
    this.props.stripe
      .createToken({
        name: 'Payment_token',
      })
      .then(result => {
        const { token } = result;
        this.props.onSubmit(token);
      });
  };

  render() {
    const {
      className,
      disabled,
      user,
      userDetails,
      presubmitText,
      onSubmit,
      balance,
      ...rest
    } = this.props;

    const classNameFinal = [];
    if (className) classNameFinal.push(className);

    if (balance <= 0) {
      return (
        <Fragment>
          <div className="forms__component">
            {'You can view and edit your details via your EPICC account.'}
          </div>
          <Button
            disabled={disabled}
            className="forms__component"
            large
            href="/account"
          >
            {'View/edit details'}
          </Button>
        </Fragment>
      );
    }

    return (
      <div>
        <label htmlFor="cardNumber" className="forms__label">
          Card number
        </label>
        <CardNumberElement className="forms__component forms__bpk-input" />
        <label htmlFor="expiry" className="forms__label">
          Expiry date
        </label>
        <CardExpiryElement className="forms__component forms__bpk-input" />
        <label htmlFor="cvc" className="forms__label">
          CVC code
        </label>
        <CardCVCElement className="forms__component forms__bpk-input" />
        <label htmlFor="postCode" className="forms__label">
          Post code
        </label>
        <PostalCodeElement className="forms__component forms__bpk-input" />
        {presubmitText && (
          <Fragment>
            <div className="forms__component">{presubmitText}</div>
          </Fragment>
        )}
        <Button
          disabled={disabled}
          className="forms__component"
          large
          onClick={this.submit}
        >
          {`Make payment for £${balance / 100}`}
        </Button>
      </div>
    );
  }
}

export default injectStripe(SignUpContinueFormPayment);
