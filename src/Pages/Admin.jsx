import React from 'react';
import { BpkSpinner, SPINNER_TYPES } from 'bpk-component-spinner';
import BpkInput, { INPUT_TYPES } from 'bpk-component-input';
import Section from '../components/Section';
import SubSection from '../components/SubSection';
import Button from '../components/Button';
import DatabaseFunctions from '../DatabaseFunctions';
import AdminComments from './AdminComments';
import AdminPayment from './AdminPayment';

import STYLES from './pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

class Admin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      paymentsCount: 0,
      pageIds: [],
      payments: [],
      apiKey: '',
      pattern: '',
    };
  }

  componentDidMount() {
    const getPageIds = () => {
      DatabaseFunctions.getPageIds(results => {
        this.setState({ pageIds: results });
      });
    };
    const getPayments = () => {
      DatabaseFunctions.getPaymentRequestCount(result => {
        this.setState({ paymentsCount: result });
      });
      if (this.state.apiKey !== '') {
        DatabaseFunctions.getPayments(this.state.apiKey, result => {
          this.setState({ payments: result });
        });
      }
    };

    getPayments();
    getPageIds();
    setInterval(getPayments, 2000);
    setInterval(getPageIds, 2000);
  }

  render() {
    const { className, ...rest } = this.props;

    const classNameFinal = [];
    if (className) classNameFinal.push(className);

    const pageIdList = (
      <SubSection name="Page IDs">
        {this.state.pageIds.map(c => <div>{c}</div>)}
      </SubSection>
    );

    return (
      <Section
        name="So, you found my admin page!"
        className={classNameFinal.join(' ')}
      >
        Check you out, you l33T H4cK3R. Unfortunately you're not going to get
        very far without my private API-Key!
        <br />
        <br />
        <BpkInput
          className={getClassName('pages__card')}
          type={INPUT_TYPES.PASSWORD}
          id="apiKey"
          name="API Key"
          value={this.state.apiKey}
          onChange={event => this.setState({ apiKey: event.target.value })}
          placeholder="API Key"
        />
        <br />
        <br />
        {pageIdList}
        <br />
        {this.state.pageIds.map(c => (
          <AdminComments apiKey={this.state.apiKey} pageId={c} />
        ))}
        <br />
        <BpkInput
          className={getClassName('pages__card')}
          id="pattern"
          name="Remove all comments containing pattern"
          value={this.state.pattern}
          onChange={event => this.setState({ pattern: event.target.value })}
          placeholder="Remove all comments containing pattern"
        />
        <br />
        <Button
          style={{ width: '100%' }}
          destructive
          onClick={() => {
            for (let i = 0; i < this.state.pageIds.length; i += 1) {
              DatabaseFunctions.deleteComment(
                this.state.apiKey,
                this.state.pageIds[i],
                this.state.pattern,
                null,
                result => {
                  console.log(result);
                },
              );
            }
          }}
        >
          DO DAMAGE
        </Button>
        <br />
        <br />
        <br />
        <br />
        <SubSection name="Payments">
          {this.state.paymentsCount}
          {this.state.payments.map(p => (
            <AdminPayment apiKey={this.state.apiKey} payment={p} />
          ))}
        </SubSection>
      </Section>
    );
  }
}

export default Admin;
