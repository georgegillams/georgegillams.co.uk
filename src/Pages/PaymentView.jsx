import React from 'react';
import { BpkSpinner, SPINNER_TYPES } from 'bpk-component-spinner';
import BpkInput, { INPUT_TYPES } from 'bpk-component-input';
import Section from '../components/Section';
import SubSection from '../components/SubSection';
import Button from '../components/Button';
import DatabaseFunctions from '../DatabaseFunctions';
import AdminComments from './AdminComments';
import TextLink from '../components/TextLink';

import STYLES from './pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

class Payment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      payment: null,
    };
  }

  componentDidMount() {
    const getPayment = () => {
      const paymentId = `${window.location}`.split('?')[1].split('=')[1];
      DatabaseFunctions.getPayment(paymentId, result => {
        this.setState({ payment: result });
      });
    };

    getPayment();
    setInterval(getPayment, 2000);
  }

  render() {
    const { className, ...rest } = this.props;

    const classNameFinal = [];
    if (className) classNameFinal.push(className);

    let paymentStatus = '';
    if (this.state.payment) {
      if (this.state.payment.status === 'pending') {
        paymentStatus =
          'is pending. I will approve it soon, and then make the payment.';
      } else if (this.state.payment.status === 'authorised') {
        paymentStatus =
          'has been approved! I will be making the transfer soon!';
      } else if (this.state.payment.status === 'completed') {
        paymentStatus = 'has been completed! Please check your bank account.';
      } else if (this.state.payment.status === 'rejected') {
        paymentStatus =
          "has been rejected. I don't just give money to anyone who comes here 🤣";
      }
    }

    return (
      <div style={{ width: '100%' }} className={classNameFinal.join(' ')}>
        <Section name="Payment Details" className={classNameFinal.join(' ')}>
          Thank you for requesting funds from me! Details of the payment will
          appear below.
          <br />
          {!this.state.payment ? (
            'Payment details loading...'
          ) : (
            <div>
              Payment id {this.state.payment.paymentId}
              <br />
              Your payment request for £{this.state.payment.amount}{' '}
              {paymentStatus}
            </div>
          )}
        </Section>
      </div>
    );
  }
}

export default Payment;
