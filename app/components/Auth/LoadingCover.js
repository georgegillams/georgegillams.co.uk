import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextLink, SubSection } from 'components/Typography';
import DefaultSkeleton from 'components/Skeletons';

import './loading-cover.scss';

const LoadingCover = props => {
  const { loadingSkeleton: LoadingSkeleton, loading, error, children } = props;

  const showLoadingMessage = loading || error;

  if (!showLoadingMessage) {
    return children || null;
  }

  return (
    <div className="loading-cover__outer-container">
      <div className="loading-cover__overlay">
        {LoadingSkeleton && <LoadingSkeleton />}
        {error && (
          <SubSection
            name="This is taking a while. Maybe something isn't quite right..."
            noPadding
            noAnchor
            className="loading-cover__overlay--content"
          />
        )}
      </div>
    </div>
  );
};

LoadingCover.propTypes = {
  loading: PropTypes.bool,
  loadingSkeleton: PropTypes.class,
  error: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

LoadingCover.defaultProps = {
  loading: false,
  loadingSkeleton: DefaultSkeleton,
  error: false,
};

export default LoadingCover;
