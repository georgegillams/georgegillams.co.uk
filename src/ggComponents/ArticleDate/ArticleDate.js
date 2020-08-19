import PropTypes from 'prop-types';
import React from 'react';

import { cssModules } from '../helpers/cssModules';

import STYLES from './article-date.module.scss';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

const ArticleDate = props => {
  const { date, noPadding, className, ...rest } = props;

  const classNames = [getClassName('article-date__date')];
  if (noPadding) {
    classNames.push(getClassName('article-date__date--no-padding'));
  }
  if (className) {
    classNames.push(className);
  }

  return (
    <span style={{ fontStyle: 'italic' }} className={classNames.join(' ')} {...rest}>
      Published {date && date.toString()}
    </span>
  );
};

ArticleDate.propTypes = {
  date: PropTypes.number.isRequired,
  className: PropTypes.string,
  noPadding: PropTypes.bool,
};

ArticleDate.defaultProps = {
  className: null,
  noPadding: false,
};

export default ArticleDate;
