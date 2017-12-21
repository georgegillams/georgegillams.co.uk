import PropTypes from 'prop-types';
import React from 'react';
import BpkText from 'bpk-component-text';

import STYLES from './article-date.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const ArticleDate = (props) => {
  const {
    date, className, ...rest
  } = props;

  const classNameFinal = [getClassName('article-date__date')];
  if (className) { classNameFinal.push(className); }

  return (
    <BpkText tagName="h3" textStyle="base" style={{ fontStyle: 'italic' }} className={classNameFinal.join(' ')}>
      Published {date.toString()}
    </BpkText>
  );
};

ArticleDate.propTypes = {
  date: PropTypes.number.isRequired,
  className: PropTypes.string,
};

ArticleDate.defaultProps = {
  className: null,
};

export default ArticleDate;
