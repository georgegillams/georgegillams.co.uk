import React from 'react';
import PropTypes from 'prop-types';
import RequestStatus from './RequestStatus';

import './request-status.scss';

const RequestStatusContainer = props => {
  const { statuses } = props;

  const classNameFinal = ['request-status__outer-container'];
  if (statuses && statuses.length > 0) {
    classNameFinal.push('request-status__outer-container--statuses-showing');
  }

  return (
    <div className={classNameFinal.join(' ')}>
      {statuses &&
        statuses.map &&
        statuses.map(status => <RequestStatus status={status} />)}
    </div>
  );
};

RequestStatusContainer.propTypes = {
  statuses: PropTypes.arrayOf(PropTypes.object),
};

RequestStatusContainer.defaultProps = {
  statuses: [],
};

export default RequestStatusContainer;
