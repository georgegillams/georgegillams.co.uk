import React from 'react';
import PropTypes from 'prop-types';

import STYLES from './flex-layout.scss';
import { cssModules } from 'gg-components/helpers/cssModules';
const getClassName = cssModules(STYLES);

const CommonLayout = props => {
  const { children } = props;

  return <main className={getClassName('flex-layout__grow')}>{children}</main>;
};

CommonLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CommonLayout;
