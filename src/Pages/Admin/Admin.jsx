import React from 'react';
import BpkInput, { INPUT_TYPES } from 'bpk-component-input';
import BpkHorizontalNav, {
  BpkHorizontalNavItem,
} from 'bpk-component-horizontal-nav';
import Section from '../../components/Section';
import Loading from '../../components/Loading';
import Button from '../../components/Button';
import DatabaseFunctions from '../../DatabaseFunctions';
import AdminComments from './AdminComments';
import AdminPayment from './AdminPayment';
import AdminBlog from './AdminBlog';
import AdminNotifications from './AdminNotifications';
import AdminBlogsPage from './AdminBlogsPage';
import AdminCommentsPage from './AdminCommentsPage';
import AdminNotificationsPage from './AdminNotificationsPage';
import AdminPaymentsPage from './AdminPaymentsPage';

import STYLES from '../pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

class Admin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      apiKey: '',
      selected: 'blogs',
    };
  }

  onClick = e => {
    this.setState({
      selected: e.target.name,
    });
  };

  render() {
    const { className, ...rest } = this.props;

    const classNameFinal = [];
    if (className) classNameFinal.push(className);

    return (
      <Section
        name="So, you found my admin page!"
        className={classNameFinal.join(' ')}
        {...rest}
      >
        Check you out, you l33T H4cK3R. Unfortunately you're not going to get
        very far without my private API-Key!
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
        <BpkHorizontalNav>
          <BpkHorizontalNavItem
            name="blogs"
            selected={this.state.selected === 'blogs'}
            onClick={this.onClick}
          >
            Blogs
          </BpkHorizontalNavItem>
          <BpkHorizontalNavItem
            name="comments"
            selected={this.state.selected === 'comments'}
            onClick={this.onClick}
          >
            Blog comments
          </BpkHorizontalNavItem>
          <BpkHorizontalNavItem
            name="notifications"
            selected={this.state.selected === 'notifications'}
            onClick={this.onClick}
          >
            Notifications
          </BpkHorizontalNavItem>
          <BpkHorizontalNavItem
            name="payments"
            selected={this.state.selected === 'payments'}
            onClick={this.onClick}
          >
            Payments
          </BpkHorizontalNavItem>
        </BpkHorizontalNav>
        {this.state.selected === 'blogs' && (
          <AdminBlogsPage apiKey={this.state.apiKey} />
        )}
        {this.state.selected === 'comments' && (
          <AdminCommentsPage apiKey={this.state.apiKey} />
        )}
        {this.state.selected === 'notifications' && (
          <AdminNotificationsPage apiKey={this.state.apiKey} />
        )}
        {this.state.selected === 'payments' && (
          <AdminPaymentsPage apiKey={this.state.apiKey} />
        )}
      </Section>
    );
  }
}

export default Admin;
