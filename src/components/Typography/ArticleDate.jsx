import PropTypes from 'prop-types';
import React from 'react';
import BpkText from 'bpk-component-text';
import { cssModules } from 'bpk-react-utils';

import STYLES from './article-date.scss';

const getClassName = cssModules(STYLES);

const ArticleDate = props => {
  const { date, noPadding, className, ...rest } = props;

  const classNameFinal = [getClassName('article-date__date')];
  if (noPadding) {
    classNameFinal.push(getClassName('article-date__date--no-padding'));
  }
  if (className) {
    classNameFinal.push(className);
  }

  return (
    <BpkText
      tagName="h3"
      textStyle="base"
      style={{ fontStyle: 'italic' }}
      className={classNameFinal.join(' ')}
      {...rest}
    >
      Published {date.toString()}
    </BpkText>
  );
};

ArticleDate.propTypes = {
  date: PropTypes.number.isRequired,
  className: PropTypes.string,
  noPadding: PropTypes.bool
};

ArticleDate.defaultProps = {
  className: null,
  noPadding: false
};

export default ArticleDate;