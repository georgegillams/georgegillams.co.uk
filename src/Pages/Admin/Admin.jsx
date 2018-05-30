import React from 'react';
import BpkInput, { INPUT_TYPES } from 'bpk-component-input';
import cookie from 'react-cookies';
import { NavLink } from 'react-router-dom';
import BpkHorizontalNav, {
  BpkHorizontalNavItem,
} from 'bpk-component-horizontal-nav';
import Section from '../../components/Section';
import AdminLogin from './AdminLogin';
import AdminBlogsPage from './AdminBlogsPage';
import AdminCommentsPage from './AdminCommentsPage';
import AdminNotificationsPage from './AdminNotificationsPage';
import AdminPaymentsPage from './AdminPaymentsPage';
import AdminPingTest from './AdminPingTest';

import STYLES from '../pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

class Admin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      apiKey: '',
      selected: 'login',
      loggedInSession: cookie.load('loggedInSession'),
      cookiesAccepted: cookie.load('cookiesAccepted'),
    };
  }

  componentDidMount() {
    const reloadLoggedInCookie = () => {
      this.setState({
        loggedInSession: cookie.load('loggedInSession'),
        cookiesAccepted: cookie.load('cookiesAccepted'),
      });
    };

    setInterval(reloadLoggedInCookie, 1000);
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
        Check you out, you l33T H4cK3R. Unfortunately you&apos;re not going to
        get very far without logging in.
        <br />
        <br />
        <BpkHorizontalNav style={{ margin: '1.2rem 0' }}>
          <BpkHorizontalNavItem
            name="login"
            selected={this.state.selected === 'login'}
            onClick={this.onClick}
          >
            Login
          </BpkHorizontalNavItem>
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
          <NavLink to="/design" style={{ textDecoration: 'none' }}>
            <BpkHorizontalNavItem
              name="design"
              selected={this.state.selected === 'design'}
              onClick={() => null}
            >
              Design
            </BpkHorizontalNavItem>
          </NavLink>
          <BpkHorizontalNavItem
            name="ping_pen_testing"
            selected={this.state.selected === 'ping_pen_testing'}
            onClick={this.onClick}
          >
            Ping pen-testing
          </BpkHorizontalNavItem>
        </BpkHorizontalNav>
        {this.state.selected === 'login' && (
          <AdminLogin
            loggedInSession={this.state.loggedInSession}
            cookiesAccepted={this.state.cookiesAccepted}
          />
        )}
        {this.state.selected === 'blogs' && (
          <AdminBlogsPage loggedInSession={this.state.loggedInSession} />
        )}
        {this.state.selected === 'comments' && (
          <AdminCommentsPage loggedInSession={this.state.loggedInSession} />
        )}
        {this.state.selected === 'notifications' && (
          <AdminNotificationsPage
            loggedInSession={this.state.loggedInSession}
          />
        )}
        {this.state.selected === 'payments' && (
          <AdminPaymentsPage loggedInSession={this.state.loggedInSession} />
        )}
        {this.state.selected === 'ping_pen_testing' && (
          <AdminPingTest loggedInSession={this.state.loggedInSession} />
        )}
      </Section>
    );
  }
}

export default Admin;
