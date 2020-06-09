import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'gg-components/Input';
import { Button } from 'gg-components/Button';
import { Paragraph, Section } from 'gg-components/Typography';
import {
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
} from 'react-stripe-elements';
import { cssModules } from 'gg-components/helpers/cssModules';
import { FormBuilder } from 'gg-components/FormBuilder';

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
import STYLES from 'components/Forms/forms.scss';

const getClassName = cssModules(STYLES);

class PaymentForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    balance: PropTypes.number.isRequired,
    disabled: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  sendPaymentToStripe = paymentIntentClientSecret => {
    if (!paymentIntentClientSecret) {
      return;
    }

    this.props.onStartPayment();
    this.props.stripe
      .confirmCardPayment(paymentIntentClientSecret, {
        payment_method: {
          card: this.props.elements.getElement('cardNumber'),
          billing_details: {
            name: 'NAME',
          },
        },
      })
      .then(result => {
        this.props.onSuccess();
      })
      .catch(err => {
        this.props.onError(err);
      });
  };

  render() {
    const {
      className,
      disabled,
      paymentIntentClientSecret,
      preSubmitText,
      onSubmit,
      onStartPayment,
      onSuccess,
      onError,
      balance,
    } = this.props;

    const classNameFinal = [];
    if (className) classNameFinal.push(className);

    const inputClassName = [
      getClassName('forms__component'),
      getClassName('forms__bpk-input'),
    ].join(' ');

    return (
      <div>
        <label htmlFor="cardNumber" className={getClassName('forms__label')}>
          Card number
        </label>
        <CardNumberElement className={inputClassName} />
        <label htmlFor="expiry" className={getClassName('forms__label')}>
          Expiry date
        </label>
        <CardExpiryElement className={inputClassName} />
        <label htmlFor="cvc" className={getClassName('forms__label')}>
          CVC code
        </label>
        <CardCVCElement className={inputClassName} />
        {preSubmitText && (
          <>
            <div className={getClassName('forms__component')}>
              {preSubmitText}
            </div>
          </>
        )}
        <Button
          disabled={disabled}
          className={getClassName('forms__component')}
          large
          onClick={e => this.props.onSubmit(this.sendPaymentToStripe)}
        >
          {`Make payment for £${balance / 100}`}
        </Button>
      </div>
    );
  }
}

export default injectStripe(PaymentForm);
