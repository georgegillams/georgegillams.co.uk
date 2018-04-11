import React from 'react';
import { withRouter } from 'react-router-dom';
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

class Payments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reference: '',
      amount: '',
      accountNumber: '',
      monzoMeLink: '',
      sortCode: '',
    };
  }

  render() {
    const { className, ...rest } = this.props;

    const classNameFinal = [];
    if (className) classNameFinal.push(className);

    // const pageIdList = (
    //   <SubSection name="Page IDs">
    //     {this.state.pageIds.map(c => <div>{c}</div>)}
    //   </SubSection>
    // );

    return (
      <div style={{ width: '100%' }} className={classNameFinal.join(' ')}>
        <Section name="Send me money" className={classNameFinal.join(' ')}>
          If you want to send me money, either{' '}
          <TextLink external href="https://monzo.me/georgestuartgillams">
            pay me via Monzo{' '}
          </TextLink>
          or make a bank transfer to 04-00-04 05339705.
        </Section>
        <Section
          name="Request money from me"
          className={classNameFinal.join(' ')}
        >
          If I owe you money, you can request it below.
          <br />
          Either provide a monzo.me link, or a sort-code and account number.
          <br />
          <br />
          <BpkInput
            className={getClassName('pages__card')}
            id="amount"
            name="Amount"
            value={this.state.amount}
            onChange={event => this.setState({ amount: event.target.value })}
            placeholder="Amount"
          />
          <br />
          <BpkInput
            className={getClassName('pages__card')}
            id="reference"
            name="Reference"
            value={this.state.reference}
            onChange={event => this.setState({ reference: event.target.value })}
            placeholder="Reference"
          />
          <br />
          <BpkInput
            disabled={
              this.state.accountNumber !== '' || this.state.sortCode !== ''
            }
            className={getClassName('pages__card')}
            id="monzo.me link"
            name="Monzo.me link"
            value={this.state.monzoMeLink}
            onChange={event =>
              this.setState({ monzoMeLink: event.target.value })
            }
            placeholder="Monzo.me link"
          />
          <br />
          <BpkInput
            disabled={this.state.monzoMeLink !== ''}
            className={getClassName('pages__card')}
            id="accountNo"
            name="Account Number"
            value={this.state.accountNumber}
            onChange={event =>
              this.setState({ accountNumber: event.target.value })
            }
            placeholder="Account Number"
          />
          <br />
          <BpkInput
            disabled={this.state.monzoMeLink !== ''}
            className={getClassName('pages__card')}
            id="sortCode"
            name="Sort Code"
            value={this.state.sortCode}
            onChange={event => this.setState({ sortCode: event.target.value })}
            placeholder="Sort Code"
          />
          <br />
          <Button
            onClick={() => {
              DatabaseFunctions.createPaymentRequest(
                this.state.amount,
                this.state.accountNumber,
                this.state.monzoMeLink,
                this.state.sortCode,
                this.state.reference,
                result => {
                  this.props.history.push(
                    `/payments/view?id=${result.payment_id}`,
                  );
                },
              );
            }}
          >
            REQUEST FUNDS
          </Button>
        </Section>
      </div>
    );
  }
}

export default withRouter(Payments);
