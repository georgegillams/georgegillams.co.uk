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

import STYLES from './forms.scss';
const getClassName = cssModules(STYLES);

class PaymentForm extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    balance: PropTypes.number.isRequired,
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
          <Paragraph>This payment has been completed.</Paragraph>
          <Button
            disabled={disabled}
            className={getClassName('forms__component')}
            large
            href="/payments"
          >
            {'Start another payment'}
          </Button>
        </Fragment>
      );
    }

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
          onClick={this.submit}
        >
          {`Make payment for £${balance / 100}`}
        </Button>
      </div>
    );
  }
}

export default injectStripe(PaymentForm);
