import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { bindActionCreators } from 'redux';
import { asyncConnect } from 'redux-async-connect';
import {
  isLoaded as isAuthLoaded,
  loginMagic,
  load as loadAuth
} from 'redux/modules/auth';
import { Section } from 'components';

@asyncConnect([
  {
    promise: ({ params, store: { dispatch, getState } }) => {
      const promises = [];

      promises.push(dispatch(loginMagic(params.key)));
      if (!isAuthLoaded(getState())) {
        promises.push(dispatch(loadAuth()));
      }

      return Promise.all(promises);
    }
  }
])
@connect(
  state => ({
    newDataAvailable: state.sessions.newDataAvailable,
    loggingIn: state.auth.loggingIn,
    user: state.auth.user
    // newCommentBeingCreated: state.comments.creating['newComment']
  }),
  dispatch => bindActionCreators({}, dispatch)
)
export default class LoginMagic extends Component {
  static propTypes = {
    newDataAvailable: PropTypes.bool.isRequired,
    loggingIn: PropTypes.bool.isRequired,
    user: PropTypes.object
  };

  static defaultProps = {
    user: null
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { user, loggingIn, ...rest } = this.props;

    return (
      <div className="container">
        <Section name="Magic log in" />
        <Helmet title="Magic log in" />
        {user && <Section name="You're now logged in!" />}
        {!loggingIn && !user && <Section name="Invalid key." />}
      </div>
    );
  }
}
