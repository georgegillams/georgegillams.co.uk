import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { LoadingIndicator } from 'gg-components/dist/LoadingIndicator';
import { Button } from 'gg-components/dist/Button';
import { Section, SubSection, TextLink } from 'gg-components/dist/Typography';
import { CodeInline } from 'gg-components/dist/Code';
import Skeleton from './Skeleton';
import { getTimeDifference } from 'helpers/time';
import { DebugObject } from 'gg-components/dist/Auth';
import { PaymentForm } from 'components/Forms';
import { STRIPE_PUBLIC_API_KEY } from 'helpers/constants';
import { Elements, StripeProvider } from 'react-stripe-elements';

import 'containers/pages.scss';

const getClassName = c => c;

export default class StripePayments extends React.Component {
  render() {
    const {
      user,
      paymentTokenChanged,
      makePayment,
      makePaymentLoading,
      makePaymentRegisterSuccess,
      makePaymentRegisterError,
      className,
      ...rest
    } = this.props; // eslint-disable-line no-shadow

    const outerClassNameFinal = [getClassName('pages__container')];

    if (className) {
      outerClassNameFinal.push(className);
    }

    const page = (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <StripeProvider apiKey={STRIPE_PUBLIC_API_KEY}>
          {/* TODO - Show loading until stripe is loaded. See https://github.com/stripe/react-stripe-elements#advanced-integrations */}
          {/* TODO - Add amount and email to form - email used to send a receipt for payment and nothing else. */}
          <Elements>
            <span>STRIPE COMPONENTS GO HERE</span>
            {/*     <PaymentForm
                presubmitText="Please note, all EPICC tickets are non-refundable."
                disabled={makePaymentLoading}
                user={user}
                balance={balance}
                userDetails={{
                  ...userDetails,
                  email: user ? user.email : '',
                }}
                onDataChanged={newValue => {
                  userDetailsChanged(newValue);
                }}
                onSubmit={arg => {
                  const tokenId = arg.id;
                  paymentTokenChanged(tokenId);
                  makePayment();
                }}
              />*/}
          </Elements>
        </StripeProvider>
      </div>
    );

    return (
      <Fragment>
        {page}
        <DebugObject
          debugTitle="Pay"
          debugObject={{
            user,
            paymentTokenChanged,
            makePayment,
            makePaymentLoading,
            makePaymentRegisterSuccess,
            makePaymentRegisterError,
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
