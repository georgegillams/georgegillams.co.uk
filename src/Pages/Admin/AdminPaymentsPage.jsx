import React from 'react';
import BpkInput, { INPUT_TYPES } from 'bpk-component-input';
import Section from '../../components/Section';
import Loading from '../../components/Loading';
import Button from '../../components/Button';
import DatabaseFunctions from '../../DatabaseFunctions';
import AdminComments from './AdminComments';
import AdminPayment from './AdminPayment';
import AdminBlog from './AdminBlog';
import AdminNotifications from './AdminNotifications';

import STYLES from '../pages.scss';

import { cssModules } from 'bpk-react-utils';
const getClassName = cssModules(STYLES);

class AdminPaymentsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      paymentsCount: 0,
      pageIds: [],
      payments: [],
      publishedBlogs: [],
      allBlogs: [],
      pattern: '',
    };
  }

  componentDidMount() {
    const getPayments = () => {
      DatabaseFunctions.getPaymentRequestCount(result => {
        this.setState({ paymentsCount: result });
      });
      if (this.props.loggedInAdmin) {
        DatabaseFunctions.getPayments(this.props.sessionId, result => {
          this.setState({ payments: result });
        });
      }
    };

    getPayments();
    setInterval(getPayments, 2000);
  }

  render() {
    const { className, loggedInAdmin, sessionId, ...rest } = this.props;

    const classNameFinal = [];
    if (className) classNameFinal.push(className);

    return (
      <Section name="Payments">
        {this.state.paymentsCount}
        {this.state.payments.map(p => (
          <AdminPayment
            sessionId={sessionId}
            loggedInAdmin={loggedInAdmin}
            payment={p}
          />
        ))}
      </Section>
    );
  }
}

export default AdminPaymentsPage;
