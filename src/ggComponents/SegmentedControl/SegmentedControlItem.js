import React from 'react';
import PropTypes from 'prop-types';

import { Paragraph } from '../Paragraph';
import { cssModules } from '../helpers/cssModules';

import STYLES from './segmented-control.module.scss';

const getClassName = cssModules(STYLES);

const SegmentedControlItem = props => {
  const { first, last, selected, children, className, ...rest } = props;

  const classNames = [getClassName('segmented-control__item', className)];
  const textClassNames = [getClassName('segmented-control__item-text')];

  if (first) {
    classNames.push(getClassName('segmented-control__item--first'));
  }

  if (last) {
    classNames.push(getClassName('segmented-control__item--last'));
  }

  if (selected) {
    classNames.push(getClassName('segmented-control__item--selected'));
    textClassNames.push(getClassName('segmented-control__item-text--selected'));
  }

  return (
    <button type="button" role="radio" aria-checked={selected} className={classNames.join(' ')} {...rest}>
      <Paragraph className={textClassNames.join(' ')}>{children}</Paragraph>
    </button>
  );
};

SegmentedControlItem.propTypes = {
  first: PropTypes.boolean,
  last: PropTypes.boolean,
  selected: PropTypes.boolean,
  className: PropTypes.string,
  children: PropTypes.node,
};

SegmentedControlItem.defaultProps = {
  first: false,
  last: false,
  selected: false,
  className: null,
  children: null,
};

export default SegmentedControlItem;
