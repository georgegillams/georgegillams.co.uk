import React, { useState } from 'react';
import PropTypes from 'prop-types';
import wrapDisplayName from 'recompose/wrapDisplayName';

export default function withGraphicContentBehaviour(Component) {
  const WithGraphicContentBehaviour = props => {
    const [graphicContentInView, setGraphicContentInView] = useState(false);

    const onClick = () => {
      setGraphicContentInView(true);
    };

    return <Component graphicContentInView={graphicContentInView} onClick={onClick} {...props} />;
  };
  WithGraphicContentBehaviour.displayName = wrapDisplayName(Component, 'withGraphicContentBehaviour');

  WithGraphicContentBehaviour.propTypes = {
    style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    className: PropTypes.string,
  };

  WithGraphicContentBehaviour.defaultProps = {
    style: null,
    className: null,
  };

  return WithGraphicContentBehaviour;
}
