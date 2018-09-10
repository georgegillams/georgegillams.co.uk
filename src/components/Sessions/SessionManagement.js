import PropTypes from 'prop-types';
import React, { Component } from 'react';
import cookie from 'react-cookies';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from 'react-responsive-modal';
import {
  createSession,
  keepAlive,
  updateNewDataAvailable
} from 'redux/modules/sessions';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import { asyncConnect } from 'redux-async-connect';
import {
  COOKIE_NAMES,
  APP_VERSION,
  COMPONENT_RELOAD_INTERVAL,
  CHECK_FOR_NEW_CONTENT_INTERVAL
} from '../../utils/constants';
import Button from '../Button/Button';
import Section from '../Typography/Section';
import TextLink from '../Typography/TextLink';
import { cssModules } from 'bpk-react-utils';
import STYLES from './cookie-banner.scss';

const getClassName = cssModules(STYLES);

@asyncConnect([
  {
    promise: ({ store: { dispatch, getState } }) => {
      const promises = [];

      if (!isAuthLoaded(getState())) {
        promises.push(dispatch(loadAuth()));
      }

      return Promise.all(promises);
    }
  }
])
@connect(
  state => ({
    contentLastUpdatedTimestamp: state.sessions.contentLastUpdatedTimestamp,
    sessions: state.sessions.data
  }),
  dispatch =>
    bindActionCreators(
      {
        loadAuth,
        keepAlive,
        createSession,
        updateNewDataAvailable
      },
      dispatch
    )
)
export default class SessionManagement extends Component {
  static propTypes = {
    contentLastUpdatedTimestamp: PropTypes.number.isRequired,
    loadAuth: PropTypes.func.isRequired,
    updateNewDataAvailable: PropTypes.func.isRequired,
    sessions: PropTypes.arrayOf(PropTypes.object),
    keepAlive: PropTypes.func.isRequired,
    createSession: PropTypes.func.isRequired,
    className: PropTypes.string
  };

  static defaultProps = {
    className: null
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedTags: [],
      cookieNotificationHidden: false,
      cookiesAccepted: false,
      localContentRefreshedTimestamp: 0,
      serverContentUpdateTimestamp: 0,
      shouldReloadNewData: false
    };
  }

  componentDidMount = () => {
    const currentAppVersionMajor = APP_VERSION.split('.')[0];
    let cookieAppVersionMajor = undefined;
    const appVersionCookie = cookie.load('version');
    if (appVersionCookie) {
      cookieAppVersionMajor = appVersionCookie.split('.')[0];
    }

    if (currentAppVersionMajor !== cookieAppVersionMajor) {
      COOKIE_NAMES.forEach(name => {
        cookie.remove(name);
      });
    }

    const session = cookie.load('session');
    const cookiesAccepted =
      window.localStorage.getItem('cookiesAccepted') === 'true';
    this.setState({ cookiesAccepted: session && cookiesAccepted });
    this.checkSessionValid(session).then(sessionValid => {
      if (session && sessionValid && cookiesAccepted) {
        this.startKeepAlive(session);
      } else {
        this.setSessionCookie();
      }
    });
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  checkSessionValid = session => {
    return new Promise(resolve => {
      this.props.keepAlive(session).then(
        res => {
          resolve(res.error ? false : true);
        },
        err => resolve(false)
      );
    });
  };

  rejectCookies = () => {
    window.location = 'https://duckduckgo.com/';
  };

  acceptCookies = () => {
    this.setState({ cookiesAccepted: true });
    window.localStorage.setItem('cookiesAccepted', 'true');
  };

  setSessionCookie = () => {
    this.props.createSession().then(args => {
      const session = args.sessionKey;
      cookie.save('session', session, {
        path: '/',
        expires: new Date(Date.now() + 24 * 60 * 60 * 100 * 1000)
      });
      cookie.save('version', APP_VERSION, {
        path: '/',
        expires: new Date(Date.now() + 24 * 60 * 60 * 100 * 1000)
      });
      this.startKeepAlive(session);
    });
  };

  startKeepAlive = session => {
    // set interval to ping keep-alive with sessionKey
    this.interval = setInterval(() => {
      this.props.keepAlive(session).then(serverContentUpdateTimestamp => {
        // If the session is invalid, recreate a new one
        if (
          serverContentUpdateTimestamp >
          this.state.localContentRefreshedTimestamp
        ) {
          // Set global state value NEED_TO_UPDATE_FROM_SERVER
          // UNDO after 1 second
          // Render "Reloading notification"
          this.setState({
            shouldReloadNewData: true,
            serverContentUpdateTimestamp: serverContentUpdateTimestamp
          });
          this.props.updateNewDataAvailable(true);
          this.props.loadAuth();
          setTimeout(() => {
            this.setState({
              shouldReloadNewData: false,
              localContentRefreshedTimestamp: serverContentUpdateTimestamp
            });
            this.props.updateNewDataAvailable(false);
          }, COMPONENT_RELOAD_INTERVAL);
        }
      });
    }, CHECK_FOR_NEW_CONTENT_INTERVAL);
  };

  render() {
    const {
      contentLastUpdatedTimestamp,
      createSession,
      keepAlive,
      className,
      ...rest
    } = this.props; // eslint-disable-line no-shadow

    return (
      <div {...rest}>
        {this.state.shouldReloadNewData && (
          <div className={getClassName('cookie-banner__new-data-available')}>
            New data has become available on the server. Reloading...
          </div>
        )}
        {/* <div className={getClassName('cookie-banner__clut-values')}>
          localContentRefreshedTimestamp:{" "}
          {this.state.localContentRefreshedTimestamp}
          <br />
          serverContentUpdateTimestamp:{" "}
          {this.state.serverContentUpdateTimestamp}
        </div> */}
        {!this.state.cookiesAccepted &&
          !this.state.cookieNotificationHidden && (
            <Modal
              open
              onClose={() => {
                alert('no can do');
              }}
              center
              closeOnEsc={false}
              closeOnOverlayClick={false}
              showCloseIcon={false}
            >
              <div className={getClassName('cookie-banner__inner-container')}>
                <Section
                  name="Privacy and cookies"
                  noPadding
                  className={getClassName('cookie-banner__blurrb')}
                >
                  Since 25 May when GDPR came into practice nobody’s had a
                  bloody clue how to be compliant. So here&apos;s yet another
                  opportunity to give a website permission to eat cookies. If
                  you don&apos;t care, stop reading now!
                  <br />
                  <br />
                  <TextLink
                    href="/design/privacy-policy"
                    onClick={() => {
                      this.setState({ cookieNotificationHidden: true });
                    }}
                  >
                    Privacy and cookies policy →
                  </TextLink>
                </Section>
                <br />
                <div>
                  <Button
                    className={getClassName('cookie-banner__component')}
                    onClick={this.acceptCookies}
                  >
                    ACCEPT
                  </Button>
                  <Button
                    className={getClassName('cookie-banner__component')}
                    small
                    destructive
                    onClick={this.rejectCookies}
                  >
                    Nope nope nope
                  </Button>
                </div>
              </div>
            </Modal>
          )}
      </div>
    );
  }
}
