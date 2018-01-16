import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

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
        <a href={linkUrl}>
          <Button large bouncy >{name}</Button>
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
