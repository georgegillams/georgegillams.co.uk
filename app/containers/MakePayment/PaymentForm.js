import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'gg-components/dist/Input';
import { Button } from 'gg-components/dist/Button';
import { Paragraph, Section } from 'gg-components/dist/Typography';
import {
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
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

import { cssModules } from 'bpk-react-utils';

import { FormBuilder } from 'gg-components/dist/FormBuilder';

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

  componentWillReceiveProps(newProps) {
    if (!newProps.paymentIntentReady) {
      return;
    }

    if (!newProps.paymentIntentClientSecret) {
      return;
    }

    // This is an additional fail-sage to ensure that we do not make a payment twice using the same paymentIntentSecret
    if (this.state.lastPICSUsed === newProps.paymentIntentClientSecret) {
      return;
    }
    this.setState({ lastPICSUsed: newProps.paymentIntentClientSecret });

    newProps.onStartPayment();
    newProps.stripe
      .confirmCardPayment(newProps.paymentIntentClientSecret, {
        payment_method: {
          card: newProps.elements.getElement('cardNumber'),
          billing_details: {
            name: 'NAME',
          },
        },
      })
      .then(result => {
        newProps.onSuccess();
      })
      .catch(err => {
        newProps.onError(err);
      });
  }

  render() {
    const {
      className,
      disabled,
      paymentIntentClientSecret,
      presubmitText,
      onSubmit,
      onStartPayment,
      onSuccess,
      onError,
      balance,
      ...rest
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
        {presubmitText && (
          <Fragment>
            <div className={getClassName('forms__component')}>
              {presubmitText}
            </div>
          </Fragment>
        )}
        <Button
          disabled={disabled}
          className={getClassName('forms__component')}
          large
          onClick={this.props.onSubmit}
        >
          {`Make payment for £${balance / 100}`}
        </Button>
      </div>
    );
  }
}

export default injectStripe(PaymentForm);
