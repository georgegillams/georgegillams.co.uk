import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SubSection from './SubSection';

import STYLES from './navigation-bar.scss';
import STYLES2 from '../Pages/pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';
const getClassName2 = className => STYLES2[className] || 'UNKNOWN';

import { colorGray700 } from 'bpk-tokens/tokens/base.es6';

const mainLinkStyle = { color: '#3e9eeb', fontFamily: 'Neuton', fontWeight: 'bold' };
const linkStyle = { color: colorGray700, fontFamily: 'Neuton' };

class NavigationItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      name, linkUrl, className, ...rest
    } = this.props;

    const outerClassNameFinal = [];
    if (className) { outerClassNameFinal.push(className); }

    return (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <a className={getClassName2('pages__link')} href={linkUrl}>
          <SubSection noPadding name={name} textClassName={getClassName2('pages__link')} />
        </a>
      </div>
    );
  }
}

NavigationItem.propTypes = {
  className: PropTypes.string,
};

NavigationItem.defaultProps = {
  className: null,
};

export default NavigationItem;
