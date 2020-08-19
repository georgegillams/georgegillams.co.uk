import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { cssModules } from '../helpers/cssModules';

import STYLES from './skeleton.module.scss';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

class Skeleton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      left: 0,
    };
  }

  componentDidMount() {
    this.adjustPositionsToAlign();
    this.interval = setInterval(() => {
      this.adjustPositionsToAlign();
    }, 2000);
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  adjustPositionsToAlign = () => {
    if (!this.divElement) {
      return;
    }

    const left = this.divElement.getBoundingClientRect().x;
    this.setState({ left });
  };

  render() {
    const { className, ...rest } = this.props;

    const classNames = getClassName('skeleton__outer', className);

    return (
      <div
        className={classNames}
        ref={divElement => {
          this.divElement = divElement;
        }}
        {...rest}>
        <div className={getClassName('skeleton__shimmer')} style={{ marginLeft: `-${this.state.left}px` }} />
      </div>
    );
  }
}

Skeleton.propTypes = {
  className: PropTypes.string,
};

Skeleton.defaultProps = {
  className: null,
};

export default Skeleton;
