import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'bpk-react-utils';

import STYLES from './scroll-indicator.scss';

const getClassName = cssModules(STYLES);

class ScrollIndicator extends Component {
  constructor(props) {
    super(props);

    this.state = { percentage: 0 };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  calculateWidth = (value, docHeight, winHeight) => {
    const footer = document.getElementById('footer');
    const footerHeight = footer.clientHeight;
    return Math.min(
      100,
      value * 100 / (docHeight - (winHeight + footerHeight)),
    );
  };

  handleScroll = () => {
    const winHeight = window.innerHeight;

    // Annoying to compute doc height due to browser inconsistency
    const { body } = document;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight,
    );

    const value = window.pageYOffset;
    const shouldShow = value > 90;
    this.setState({
      percentage: shouldShow
        ? this.calculateWidth(value, docHeight, winHeight)
        : 0,
    });
  };

  render() {
    const { className, ...rest } = this.props;

    const classNameFinal = [getClassName('scroll-indicator__outer')];
    if (this.state.percentage < 1) {
      classNameFinal.push(getClassName('scroll-indicator__outer--hidden'));
    }
    if (className) classNameFinal.push(className);

    return (
      <div className={classNameFinal.join(' ')} {...rest}>
        {' '}
        <div
          className={getClassName('scroll-indicator__bar')}
          style={{ width: `${this.state.percentage}%` }}
        />
      </div>
    );
  }
}

ScrollIndicator.propTypes = {
  className: PropTypes.string,
};

ScrollIndicator.defaultProps = {
  className: null,
};

export default ScrollIndicator;
