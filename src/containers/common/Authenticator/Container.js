import React from 'react';
import PropTypes from 'prop-types';
import DebugObject from 'components/common/DebugObject';
import { useEffectOnce } from 'react-use';

const Authenticator = props => {
  const { loadAuth, authenticatorState } = props;

  useEffectOnce(() => {
    loadAuth();
  });

  return (
    <div>
      <DebugObject
        debugTitle="Authenticator"
        debugObject={{
          loadAuth,
          authenticatorState,
        }}
      />
    </div>
  );
};

Authenticator.propTypes = {
  loadAuth: PropTypes.func.isRequired,
  authenticatorState: PropTypes.shape({
    loadingAuth: PropTypes.bool,
    loadAuthError: PropTypes.object,
    user: PropTypes.object,
  }).isRequired,
};

Authenticator.defaultProps = {};

export default Authenticator;
