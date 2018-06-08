import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cookie from 'react-cookies';
import Section from './Section';
import TextLink from './TextLink';
import Button from './Button';

import STYLES from './cookie-banner.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

class CookieBanner extends Component {
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
    const classNameFinal = [getClassName('cookie-banner__outer-container')];

    if (className) {
      classNameFinal.push(className);
    }

    if (this.state.cookiesAccepted) {
      return null;
    }

    return (
      <div className={classNameFinal.join(' ')} {...rest}>
        <div className={getClassName('cookie-banner__inner-container')}>
          <Section
            light
            name="Privacy and cookies"
            noPadding
            className={getClassName('cookie-banner__blurrb')}
          >
            Since 25 May when GDPR came into practice nobody’s had a bloody clue
            how to be compliant. So here&apos;s yet another opportunity to give
            a website permission to eat cookies. If you don&apos;t care, stop
            reading now!
            <br />
            <br />
            <TextLink light href="/design/privacy-policy">
              Privacy and cookies policy →
            </TextLink>
          </Section>
          <Button
            className={getClassName('cookie-banner__button')}
            onClick={() => {
              cookie.save('cookiesAccepted', true, {
                path: '/',
                expires: new Date(Date.now() + 24 * 60 * 60 * 100 * 1000),
              });
              this.setState({ cookiesAccepted: true });
            }}
          >
            I agree to my data and cookies being used in this way.
          </Button>
        </div>
      </div>
    );
  }
}

CookieBanner.propTypes = {
  className: PropTypes.string,
};

CookieBanner.defaultProps = {
  className: null,
};

export default CookieBanner;
