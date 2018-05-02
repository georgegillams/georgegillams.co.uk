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

const getClassName = className => STYLES[className] || 'UNKNOWN';

class AdminNotificationsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
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
      if (this.props.apiKey !== '') {
        DatabaseFunctions.getPayments(this.props.apiKey, result => {
          this.setState({ payments: result });
        });
      }
    };
    const getBlogs = () => {
      if (this.props.apiKey !== '') {
        DatabaseFunctions.getBlogs(this.props.apiKey, [], result => {
          this.setState({ allBlogs: result });
        });
      }
      DatabaseFunctions.getBlogs('', [], result => {
        this.setState({ publishedBlogs: result });
      });
    };
    getPayments();
    getPageIds();
    getBlogs();
    setInterval(getPayments, 2000);
    setInterval(getBlogs, 2000);
    setInterval(getPageIds, 2000);
  }

  render() {
    const { className, apiKey, ...rest } = this.props;

    const classNameFinal = [];
    if (className) classNameFinal.push(className);

    return (
      <Section name="Notifications" {...rest}>
        <AdminNotifications apiKey={apiKey} />
      </Section>
    );
  }
}

export default AdminNotificationsPage;
