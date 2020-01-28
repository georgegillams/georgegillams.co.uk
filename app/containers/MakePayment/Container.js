import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { LoadingIndicator } from 'gg-components/dist/LoadingIndicator';
import { Button } from 'gg-components/dist/Button';
import {
  Paragraph,
  Section,
  SubSection,
  TextLink,
} from 'gg-components/dist/Typography';
import { CodeInline } from 'gg-components/dist/Code';
import Skeleton from './Skeleton';
import { getTimeDifference } from 'helpers/time';
import { DebugObject, LoadingCover } from 'gg-components/dist/Auth';
import PaymentForm from './PaymentForm';
import { STRIPE_PUBLIC_API_KEY } from 'helpers/constants';
import { Elements, StripeProvider } from 'react-stripe-elements';

import 'containers/pages.scss';

const getClassName = c => c;

export default class StripePayments extends React.Component {
  componentDidMount = () => {
    const paymentId = this.props.match.params.id;
    if (paymentId) {
      this.props.loadPayment(paymentId);
    }
  };

  render() {
    const {
      user,
      stripe,

      loadPayment,
      payment,
      loadPaymentLoading,
      loadPaymentSuccess,
      loadPaymentError,

      makePayment,
      makePaymentLoading,
      makePaymentSuccess,
      makePaymentError,

      paymentIntentReady,
      makePaymentIntent,
      paymentIntent,
      makePaymentIntentLoading,
      makePaymentIntentSuccess,
      makePaymentIntentError,

      makePaymentRegisterSuccess,
      makePaymentRegisterError,

      className,
      ...rest
    } = this.props;

    const outerClassNameFinal = [getClassName('pages__container')];

    if (className) {
      outerClassNameFinal.push(className);
    }

    let name = '';
    if (payment) {
      name = `Pay £${payment && payment.outstandingBalance / 100}`;

      if (payment.outstandingBalance === 0) {
        name = `Payment of £${payment.amount / 100}`;
      } else if (payment.outstandingBalance !== payment.amount) {
        name += ` (remaining balance on payment of £${payment.amount / 100})`;
      }
    }

    const paymentIsComplete = payment && payment.outstandingBalance <= 0;

    const page = (
      <Section name={name} {...rest}>
        {paymentIsComplete && (
          <Fragment>
            <Paragraph>This payment has been completed.</Paragraph>
            <br />
            <Button
              className={getClassName('forms__component')}
              large
              href="/payments"
            >
              {'Start another payment'}
            </Button>
          </Fragment>
        )}
        {!paymentIsComplete && (
          <StripeProvider apiKey={STRIPE_PUBLIC_API_KEY}>
            {/* TODO - Show loading until stripe is loaded. See https://github.com/stripe/react-stripe-elements#advanced-integrations */}
            <Elements>
              <PaymentForm
                disabled={
                  makePaymentIntentLoading ||
                  makePaymentLoading ||
                  makePaymentSuccess
                }
                balance={payment ? payment.outstandingBalance : 0}
                paymentIntentReady={paymentIntentReady}
                paymentIntentClientSecret={
                  paymentIntent && paymentIntent.paymentIntentClientSecret
                }
                onSubmit={arg => {
                  makePaymentIntent();
                }}
                onStartPayment={arg => {
                  makePayment();
                }}
                onError={arg => {
                  makePaymentRegisterError(arg);
                }}
                onSuccess={arg => {
                  makePaymentRegisterSuccess();
                }}
              />
            </Elements>
          </StripeProvider>
        )}
      </Section>
    );

    return (
      <Fragment>
        <LoadingCover
          loadingSkeleton={Skeleton}
          loading={loadPaymentLoading}
          error={loadPaymentError}
        >
          {page}
        </LoadingCover>
        <DebugObject
          debugTitle="Pay"
          debugObject={{
            user,
            makePayment,
            makePaymentLoading,
            makePaymentSuccess,
            makePaymentError,
            className,
          }}
        />
      </Fragment>
    );
  }
}

StripePayments.propTypes = {
  loggingIn: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  createdPayment: PropTypes.object,
  login: PropTypes.func.isRequired,
  className: PropTypes.string,
};
