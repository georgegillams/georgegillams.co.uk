import PropTypes from 'prop-types';
import React, { Component } from 'react';
import BpkInput from 'bpk-component-input';
import BpkTextArea from 'bpk-component-textarea';
import { withRouter } from 'react-router-dom';
import BpkCheckBox from 'bpk-component-checkbox';
import TagFilter from './TagFilter';

import STYLES from './article-date.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const TagFilterRoutable = withRouter(TagFilter);

class HorizontalNav extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { children, className, ...rest } = this.props;

    const classNameFinal = [getClassName('horizontal-nav__outer-container')];
    if (className) {
      classNameFinal.push(className);
    }

    return (
      <div
        className={classNameFinal.join(' ')}
        style={{ backgroundColor: 'hotpink', width: '100%', height: '5rem' }}
      >
        {children}
      </div>
    );
  }
}

HorizontalNav.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  className: PropTypes.string,
};

HorizontalNav.defaultProps = {
  className: null,
};

export default HorizontalNav;
