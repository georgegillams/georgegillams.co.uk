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
import AdminSessionsPage from './AdminSessionsPage';
import AdminCommentsPage from './AdminCommentsPage';
import AdminNotificationsPage from './AdminNotificationsPage';
import AdminPaymentsPage from './AdminPaymentsPage';
import AdminPingTest from './AdminPingTest';

import STYLES from '../pages.scss';

import { cssModules } from 'bpk-react-utils';
const getClassName = cssModules(STYLES);

class Admin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: `${window.location}`.split('admin/')[1].replace('/', ''),
      loggedInAdmin: cookie.load('loggedInAdmin'),
      sessionId: cookie.load('sessionId'),
    };
  }

  componentDidMount() {
    const reloadCookies = () => {
      this.setState({
        loggedInAdmin: !!cookie.load('loggedInAdmin'),
        sessionId: cookie.load('sessionId'),
      });
    };

    setInterval(reloadCookies, 1000);
  }

  onClick = e => {
    this.setState({
      selected: e.target.name,
    });
    this.props.history.push(`/admin/${e.target.name}`);
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
            name="sessions"
            selected={this.state.selected === 'sessions'}
            onClick={this.onClick}
          >
            Sessions
          </BpkHorizontalNavItem>
          <BpkHorizontalNavItem
            name="blogs"
            selected={this.state.selected === 'blogs'}
            onClick={this.onClick}
          >
            Blogs
          </BpkHorizontalNavItem>
          <BpkHorizontalNavItem
            name="blog-comments"
            selected={this.state.selected === 'blog-comments'}
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
            name="ping-pen-testing"
            selected={this.state.selected === 'ping-pen-testing'}
            onClick={this.onClick}
          >
            Ping pen-testing
          </BpkHorizontalNavItem>
        </BpkHorizontalNav>
        {this.state.selected === 'login' && (
          <AdminLogin
            sessionId={this.state.sessionId}
            loggedInAdmin={this.state.loggedInAdmin}
          />
        )}
        {this.state.selected === 'sessions' && (
          <AdminSessionsPage
            sessionId={this.state.sessionId}
            loggedInAdmin={this.state.loggedInAdmin}
          />
        )}
        {this.state.selected === 'blogs' && (
          <AdminBlogsPage
            sessionId={this.state.sessionId}
            loggedInAdmin={this.state.loggedInAdmin}
          />
        )}
        {this.state.selected === 'blog-comments' && (
          <AdminCommentsPage
            sessionId={this.state.sessionId}
            loggedInAdmin={this.state.loggedInAdmin}
          />
        )}
        {this.state.selected === 'notifications' && (
          <AdminNotificationsPage
            sessionId={this.state.sessionId}
            loggedInAdmin={this.state.loggedInAdmin}
          />
        )}
        {this.state.selected === 'payments' && (
          <AdminPaymentsPage
            sessionId={this.state.sessionId}
            loggedInAdmin={this.state.loggedInAdmin}
          />
        )}
        {this.state.selected === 'ping-pen-testing' && (
          <AdminPingTest
            sessionId={this.state.sessionId}
            loggedInAdmin={this.state.loggedInAdmin}
          />
        )}
      </Section>
    );
  }
}

export default Admin;
