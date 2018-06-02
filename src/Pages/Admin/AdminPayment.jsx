import React from 'react';
import { BpkSpinner, SPINNER_TYPES } from 'bpk-component-spinner';
import BpkInput from 'bpk-component-input';
import Section from '../../components/Section';
import TextLink from '../../components/TextLink';
import SubSection from '../../components/SubSection';
import Button from '../../components/Button';
import DatabaseFunctions from '../../DatabaseFunctions';

import STYLES from '../pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

class AdminPayment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    // const getComments = () => {
    //   DatabaseFunctions.getComments(this.props.pageId, results => {
    //     this.setState({ comments: results });
    //   });
    // };
    //
    // getComments();
    // setInterval(getComments, 1000);
  }

  render() {
    const { loggedInSession, payment, className, ...rest } = this.props;

    const classNameFinal = [];
    if (className) classNameFinal.push(className);

    return (
      <SubSection
        name={`£${payment.amount} ${payment.reference} - ${payment.status}`}
      >
        {`${payment.paymentId} ${payment.amount} ${payment.reference} ${
          payment.accountNumber
        } ${payment.sortCode} `}
        <TextLink external href={payment.monzoMeLink}>
          Monzo.me{' '}
        </TextLink>
        <br />
        <Button
          disabled={payment.status === 'authorised'}
          onClick={() => {
            DatabaseFunctions.authorisePayment(
              loggedInSession,
              payment.paymentId,
              result => null,
            );
          }}
        >
          Authorise payment
        </Button>
        <Button
          disabled={payment.status === 'completed'}
          onClick={() => {
            DatabaseFunctions.completePayment(
              loggedInSession,
              payment.paymentId,
              result => null,
            );
          }}
        >
          Complete payment
        </Button>
        <Button
          disabled={payment.status === 'rejected'}
          destructive
          onClick={() => {
            DatabaseFunctions.rejectPayment(
              loggedInSession,
              payment.paymentId,
              result => null,
            );
          }}
        >
          Reject payment
        </Button>
        <Button
          destructive
          onClick={() => {
            DatabaseFunctions.deletePayment(
              loggedInSession,
              payment.paymentId,
              result => null,
            );
          }}
        >
          Delete payment
        </Button>
      </SubSection>
    );
  }
}

export default AdminPayment;
