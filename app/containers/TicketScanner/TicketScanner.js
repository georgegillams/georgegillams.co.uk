import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import LoadingIndicator from 'components/LoadingIndicator';
import GGButton from 'components/GGButton';
import { SectionSkeleton } from 'components/Skeletons';
import { Section, SubSection, TextLink } from 'components/Typography';
import Ticket from 'components/Ticket';
import CodeInline from 'components/Code';

import Skeleton from './Skeleton';
import { getTimeDifference } from 'helpers/time';
import { beautifyTicketType } from 'helpers/ticketing';
import { DebugObject, LoadingCover, LoggedInOnly } from 'components/Auth';
import QrReader from 'react-qr-reader';
import {
  SignUpContinueFormAboutYou,
  SignUpContinueFormYourDegree,
  SignUpContinueFormYourRequirements,
  SignUpContinueFormPhotoRelease,
  SignUpContinueFormPayment,
} from 'components/Forms';
import { CookiesOnly } from 'components/Sessions';
import { STRIPE_PUBLIC_API_KEY } from 'helpers/constants';
import BpkImage, {
  withLazyLoading,
  withLoadingBehavior,
} from 'bpk-component-image';
import BpkThemeProvider from 'bpk-theming';
import BpkCard from 'bpk-component-card';
import BpkProgressBar, {
  themeAttributes as progressThemeAttributes,
} from 'bpk-component-progress';
import { Elements, StripeProvider } from 'react-stripe-elements';

import 'containers/pages.scss';
import './ticket-scanner.scss';

const MIN_PAGE_NUMBER = 1;
const MAX_PAGE_NUMBER = 5;
const PAYMENT_PAGE_NUMBER = MAX_PAGE_NUMBER;

const getClassName = c => c;

export default class TicketScanner extends React.Component {
  constructor(props) {
    super(props);

    this.state = { scanning: true };
  }

  handleScan = data => {
    if (data) {
      this.setState({ scanning: false });
      this.props.registerUser(JSON.parse(data.split("'").join('"')));
    }
  };

  handleError = err => {
    console.error(err);
  };

  render() {
    const {
      setLoginRedirect,
      user,
      userLoading,
      registration,
      registering,
      success,
      error,
      className,
      ...rest
    } = this.props; // eslint-disable-line no-shadow

    const outerClassNameFinal = ['pages__container'];

    if (className) {
      outerClassNameFinal.push(className);
    }

    const messageClassname = [];
    let displayType = 'error';
    if (error) {
      messageClassname.push('ticket-scanner__error');
    }

    if (this.state.scanning) {
      displayType = 'scanning';
    } else if (registering) {
      displayType = 'registering';
    } else if (
      registration &&
      registration.overall === 'COMPLETE' &&
      registration.photoRelease === 'COMPLETE'
    ) {
      displayType = 'perfect';
      messageClassname.push('ticket-scanner__all-good');
    } else if (registration && registration.overall === 'COMPLETE') {
      displayType = 'no-photo-release';
      messageClassname.push('ticket-scanner__no-photo-release');
    } else if (registration) {
      displayType = 'error';
      messageClassname.push('ticket-scanner__error');
    }

    return (
      <div className={outerClassNameFinal.join(' ')}>
        <LoggedInOnly
          user={user}
          setLoginRedirect={() => setLoginRedirect('ticket')}
        >
          <LoadingCover loadingSkeleton={Skeleton} loading={userLoading}>
            {error && (
              <Section
                className={messageClassname.join(' ')}
                name="An error occured"
              />
            )}
            {this.state.scanning && (
              <Fragment>
                <QrReader
                  delay={300}
                  onError={this.handleError}
                  onScan={this.handleScan}
                  style={{ width: '100%' }}
                />
              </Fragment>
            )}
            {displayType === 'perfect' && (
              <Section className={messageClassname.join(' ')} name="Registered">
                Registration successful.
              </Section>
            )}
            {displayType === 'no-photo-release' && (
              <Section className={messageClassname.join(' ')} name="Registered">
                Registration successful. Photo release is not complete. Issue a
                Yellow lanyard.
              </Section>
            )}
            {displayType === 'error' && (
              <Section className={messageClassname.join(' ')} name="Error">
                Ticket is not valid.
              </Section>
            )}
            {displayType === 'registering' && <SectionSkeleton />}
            {!this.state.scanning && (
              <GGButton
                large
                onClick={() => {
                  this.setState({ scanning: true });
                }}
              >
                Scan another
              </GGButton>
            )}
          </LoadingCover>
        </LoggedInOnly>
        <DebugObject
          debugTitle="Ticket scanner"
          debugObject={{
            setLoginRedirect,
            user,
            userLoading,
            registering,
            success,
            error,
            className,
          }}
        />
      </div>
    );
  }
}

TicketScanner.propTypes = {
  linkToSwap: PropTypes.bool,
  linkToPay: PropTypes.bool,
};
TicketScanner.defaultProps = { linkToSwap: true, linkToPay: true };