import React from 'react';
import PropTypes from 'prop-types';

import { Section } from '../Section';
import { cssModules } from '../helpers/cssModules';
import { ObjectAsList } from '../ObjectAsList';

import STYLES from './debug-object.module.scss';

const getClassName = cssModules(STYLES);

const DebugObject = props => {
  const { debugTitle, debugObject } = props;

  return (
    <Section className={getClassName('debug-object__main')} name={`${debugTitle || 'Debug object'}`}>
      <ObjectAsList value={debugObject} />
    </Section>
  );
};

DebugObject.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  debugObject: PropTypes.object.isRequired,
  debugTitle: PropTypes.string,
};

DebugObject.defaultProps = {
  debugTitle: null,
};

export default DebugObject;
