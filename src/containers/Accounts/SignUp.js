import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { bindActionCreators } from 'redux';
import { createUser } from 'redux/modules/auth';
import { TextLink, NotificationComp, SignUpForm, Section } from 'components';

@connect(
  state => ({
    newDataAvailable: state.sessions.newDataAvailable,
    registeringError: state.auth.registeringError,
    registered: state.auth.registered,
    // newCommentBeingCreated: state.comments.creating['newComment']
  }),
  dispatch => bindActionCreators({ createUser }, dispatch),
)
export default class SignUp extends Component {
  static propTypes = {
    newDataAvailable: PropTypes.bool.isRequired,
    registeringError: PropTypes.object.isRequired,
    registered: PropTypes.object.isRequired,
    createUser: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      newUser: { uname: '', name: '', email: '', password: '' },
    };
  }

  updateNewUser = newValue => {
    this.setState({ newUser: newValue });
  };

  handleSubmit = () => {
    this.props.createUser(this.state.newUser);
  };

  render() {
    const {
      registered,
      registeringError,
      newDataAvailable,
      ...rest
    } = this.props;

    return (
      <div className="container">
        <Section name="SignUp" />
        <Helmet title="Signup" />

        {registered && (
          <NotificationComp type="success">
            {'Registration successful. [You can now login](/account)'}
          </NotificationComp>
        )}
        {registeringError && (
          <NotificationComp type="error">
            {registeringError.reason}
          </NotificationComp>
        )}
        <SignUpForm
          newUser={this.state.newUser}
          onDataChanged={this.updateNewUser}
          onSubmit={this.handleSubmit}
        />
        <br />
        <TextLink href="/account">Login </TextLink>
      </div>
    );
  }
}
