import React from 'react';
import cookie from 'react-cookies';
import Section from '../../components/Section';
import Button from '../../components/Button';
import DatabaseFunctions from '../../DatabaseFunctions';

import STYLES from '../pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

class DesignPrivacyPolicy extends React.Component {
  constructor(props) {
    super(props);

    this.state = { sessionId: cookie.load('sessionId') };
  }

  componentDidMount() {
    const reloadCookies = () => {
      this.setState({
        sessionId: cookie.load('sessionId'),
      });
    };

    reloadCookies();
    setInterval(reloadCookies, 1000);
  }
  createSessionCookie = () => {
    const existingSessionId = cookie.load('sessionId');
    if (!existingSessionId) {
      DatabaseFunctions.getNewSessionId(({ sessionId }) => {
        cookie.save('sessionId', sessionId, {
          path: '/',
          expires: new Date(Date.now() + 24 * 60 * 60 * 100 * 1000),
        });
      });
    }
  };

  render() {
    const { className, ...rest } = this.props;

    const classNameFinal = [];
    if (className) classNameFinal.push(className);

    return (
      <Section name="Privacy policy and cookies">
        Oh wow, someone&apos;s actually reading this!
        <br />
        <br />
        By allowing cookies to be stored, you will generate a session ID which
        will be stored on your computer (as a cookie) and in my database
        indefinitely, along with your public IP address.
        <br />
        <br />
        The only other personal information I will collect and store is that
        which you explicitly submit in form fields (such as the comments area of
        a blog page).
        <br />
        <br />
        Other information about your interactions may also be stored locally as
        cookies (such as IDs of comments you write).<br />
        <br />Your information will never be made available to any third-party
        organisations.
        <br />
        <br />
        {!this.state.sessionId && (
          <Button
            onClick={() => {
              this.createSessionCookie();
              this.setState({ sessionId: true });
            }}
          >
            I agree to my data and cookies being used in this way.
          </Button>
        )}
      </Section>
    );
  }
}

export default DesignPrivacyPolicy;
