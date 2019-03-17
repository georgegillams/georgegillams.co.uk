import React from 'react';
import PropTypes from 'prop-types';
import Status from './Status';
import ArticleCard, { CARD_LAYOUTS } from 'components/Cards';

import './status-card.scss';

const StatusCard = props => {
  const { data, overallStatus, className, ...rest } = props;

  const classNameFinal = ['status-card__container'];
  if (className) classNameFinal.push(className);

  return (
    <div className={classNameFinal.join(' ')} {...rest}>
      <ArticleCard
        layout={CARD_LAYOUTS.narrowCompact}
        className="status-card__card"
      >
        <div className="status-card__content-items">
          {data &&
            data.map(dataItem => (
              <div className="status-card__content-item">
                <Status
                  type={dataItem.status}
                  className="status-card__content-item-status"
                />
                {dataItem.item}
                <br />
                <br />
              </div>
            ))}
        </div>
      </ArticleCard>
      <Status
        shadow
        type={overallStatus}
        large
        className="status-card__status"
      />
    </div>
  );
};

StatusCard.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  overallStatus: PropTypes.string.isRequired,
  className: PropTypes.string,
};

StatusCard.defaultProps = {
  className: null,
};

export default StatusCard;
