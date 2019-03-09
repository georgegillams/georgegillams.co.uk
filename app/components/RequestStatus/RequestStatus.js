import React from 'react';
import PropTypes from 'prop-types';

import './request-status.scss';

const RequestStatus = props => {
  const { status, className, ...rest } = props;
  const { type, message } = status;

  const classNameFinal = ['request-status__status'];

  if (type === 'success') {
    classNameFinal.push('request-status__status--success');
  }
  if (type === 'warn') {
    classNameFinal.push('request-status__status--warn');
  }
  if (type === 'error') {
    classNameFinal.push('request-status__status--error');
  }

  if (className) {
    classNameFinal.push(className);
  }

  return (
    <span className={classNameFinal.join(' ')} {...rest}>
      {message}
    </span>
  );
};

RequestStatus.propTypes = {
  status: PropTypes.object.isRequired,
  className: PropTypes.string,
};

RequestStatus.defaultProps = {
  className: null,
};

export default RequestStatus;
