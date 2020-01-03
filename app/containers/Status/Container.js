import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { cssModules } from 'bpk-react-utils';
import { getTimeDifference } from 'helpers/time';

import STYLES from '../pages.scss';

import { Section, SubSection } from 'gg-components/dist/Typography';
const getClassName = cssModules(STYLES);

const Status = props => {
  return (
    <div {...props}>
      <Helmet title="Status" />
      <Section anchor={false} name="Status">
        <img
          className={getClassName('pages__component')}
          alt="Build status"
          src="https://api.travis-ci.org/georgegillams/georgegillams.co.uk.svg?branch=master"
        />
        <br />
        <img
          className={getClassName('pages__component')}
          alt="Greenkeeper status"
          src="https://badges.greenkeeper.io/georgegillams/georgegillams.co.uk.svg"
        />
        <SubSection className={getClassName('pages__component')} anchor={false}>
          Built {getTimeDifference(new Date(process.env.BUILT_AT * 1000))}
          <br />
          App started{' '}
          {getTimeDifference(new Date(process.env.STARTED_AT * 1000))}
        </SubSection>
      </Section>
    </div>
  );
};

export default Status;
