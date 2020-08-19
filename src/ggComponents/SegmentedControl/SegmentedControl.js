import React from 'react';
import PropTypes from 'prop-types';

import { cssModules } from '../helpers/cssModules';

import SegmentedControlItem from './SegmentedControlItem.js';
import STYLES from './segmented-control.module.scss';

const getClassName = cssModules(STYLES);

const SegmentedControl = props => {
  const { options, selectedIndex, onSelectionChanged, enableDeselection, className, ...rest } = props;

  const classNames = [getClassName('segmented-control__outer', className)];

  return (
    <div role="radiogroup" className={classNames.join(' ')} {...rest}>
      {options.map((o, i) => (
        <SegmentedControlItem
          key={o.key}
          first={i === 0}
          last={i === options.length - 1}
          onClick={() => {
            if (enableDeselection && selectedIndex === i) {
              onSelectionChanged(undefined, null);
            } else {
              onSelectionChanged(i, o.key);
            }
          }}
          selected={selectedIndex === i}>
          {o.label}
        </SegmentedControlItem>
      ))}
    </div>
  );
};

SegmentedControl.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelectionChanged: PropTypes.func.isRequired,
  enableDeselection: PropTypes.bool,
  selectedIndex: PropTypes.number,
  className: PropTypes.string,
};

SegmentedControl.defaultProps = {
  selectedIndex: null,
  enableDeselection: false,
  className: null,
};

export default SegmentedControl;
