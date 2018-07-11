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
      if (this.props.loggedInAdmin !== '') {
        DatabaseFunctions.getPayments(this.props.loggedInAdmin, result => {
          this.setState({ payments: result });
        });
      }
    };
    const getBlogs = () => {
      if (this.props.loggedInAdmin !== '') {
        DatabaseFunctions.getBlogs(
          'all',
          this.props.loggedInAdmin,
          [],
          result => {
            this.setState({ allBlogs: result });
          },
        );
      }
      DatabaseFunctions.getBlogs('all', '', [], result => {
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
    const { className, loggedInAdmin, sessionId, ...rest } = this.props;

    const classNameFinal = [];
    if (className) classNameFinal.push(className);

    return (
      <Section name="Notifications" {...rest}>
        <AdminNotifications
          sessionId={sessionId}
          loggedInAdmin={loggedInAdmin}
        />
      </Section>
    );
  }
}

export default AdminNotificationsPage;
