import React from 'react';
import PropTypes from 'prop-types';
import GGButton  from 'components/GGButton';

const NavigationItem = props => {
  const { name, linkUrl, className, ...rest } = props;

  const outerClassNameFinal = ['navigation-bar__nav-item'];
  if (className) {
    outerClassNameFinal.push(className);
  }

  return (
    <div className={outerClassNameFinal.join(' ')}>
      <GGButton href={linkUrl} bouncy {...rest}>
        {name}
      </GGButton>
    </div>
  );
};

NavigationItem.propTypes = {
  name: PropTypes.string,
  linkUrl: PropTypes.string,
  className: PropTypes.string,
};

NavigationItem.defaultProps = {
  name: null,
  linkUrl: null,
  className: null,
};

export default NavigationItem;