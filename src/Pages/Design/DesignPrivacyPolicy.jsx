import React from 'react';
import cookie from 'react-cookies';
import Section from '../../components/Section';
import Button from '../../components/Button';

import STYLES from '../pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

class DesignPrivacyPolicy extends React.Component {
  constructor(props) {
    super(props);

    this.state = { cookiesAccepted: cookie.load('cookiesAccepted') };
  }

  componentDidMount() {
    const reloadCookies = () => {
      this.setState({
        cookiesAccepted: cookie.load('cookiesAccepted'),
      });
    };

    reloadCookies();
    setInterval(reloadCookies, 1000);
  }

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
        {!this.state.cookiesAccepted && (
          <Button
            onClick={() => {
              cookie.save('cookiesAccepted', true, { path: '/' });
              this.setState({ cookiesAccepted: true });
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
