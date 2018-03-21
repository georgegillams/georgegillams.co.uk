import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Strikethrough extends Component {
  render() {
    const { children, ...rest } = this.props;

    return (
      <span style={{ textDecoration: 'line-through' }} {...rest}>
        {children}
      </span>
    );
  }
}

Strikethrough.propTypes = {
  children: PropTypes.node,
};

Strikethrough.defaultProps = {
  children: null,
};

export default Strikethrough;
