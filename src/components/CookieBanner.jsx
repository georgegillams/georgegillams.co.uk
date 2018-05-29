import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cookie from 'react-cookies';
import Section from './Section';
import Button from './Button';

import STYLES from './cookie-banner.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

class CookieBanner extends Component {
  constructor(props) {
    super(props);

    this.state = { cookiesAccepted: cookie.load('cookiesAccepted') };
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
          <Section noPadding className={getClassName('cookie-banner__blurrb')}>
            Since 25 May when GDPR came into practice, nobody’s had a bloody
            clue how to be compliant. So, henceforth, I present you yet another
            opportunity to give a website permission to eat cookies. Wow, are
            you actually still reading this? Just click OK!
          </Section>
          <Button
            className={getClassName('cookie-banner__button')}
            onClick={() => {
              cookie.save('cookiesAccepted', true, { path: '/' });
              this.setState({ cookiesAccepted: true });
            }}
          >
            OK 🙈
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
