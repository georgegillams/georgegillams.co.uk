import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BpkImage, {
  withLoadingBehavior,
  withLazyLoading,
} from 'bpk-component-image';
import { Section, SubSection } from 'components/Typography';
import { Link } from 'react-router-dom';
import HelperFunctions from 'helpers/HelperFunctions';
import STYLES from './shady-container.scss';
import { cssModules } from 'bpk-react-utils';

const getClassName = cssModules(STYLES);

import './shady-container.scss';

export const SHADY_CONTAINER_COLORS = {
  dark: 'dark',
  gray: 'gray',
  light: 'light',
};
export const SHADY_CONTAINER_IMAGE_STYLES = {
  fixed: 'fixed',
  runOff: 'runOff',
};

class ShadyContainer extends Component {
  constructor(props) {
    super(props);

    this.state = { hovering: false };
  }

  render() {
    const {
      ariaLabel,
      subtext,
      title,
      className,
      color,
      imageSrc,
      imageStyle,
      linkUrl,
      ...rest
    } = this.props;

    const classNames = [getClassName('shady-container')];

    classNames.push(getClassName(`shady-container--${color}`));

    const textContainer = (
      <div className={getClassName('shady-container__text-container')}>
        <Section noPadding name={title} />
        <span>{subtext}</span>
      </div>
    );

    return (
      <div className={classNames.join(' ')} {...rest}>
        {textContainer}
      </div>
    );
  }
}

ShadyContainer.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
  subtext: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  color: PropTypes.oneOf(Object.values(SHADY_CONTAINER_COLORS)),
  imageSrc: PropTypes.node,
  imageStyle: PropTypes.oneOf(Object.values(SHADY_CONTAINER_IMAGE_STYLES)),
  linkUrl: PropTypes.string,
};

ShadyContainer.defaultProps = {
  className: null,
  color: SHADY_CONTAINER_COLORS.gray,
  imageSrc: null,
  imageStyle: SHADY_CONTAINER_IMAGE_STYLES.fixed,
  linkUrl: null,
};

export default ShadyContainer;
