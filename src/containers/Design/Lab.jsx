/* eslint-disable */
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Section, StatusCard, Status, SubSection, bpkDemo } from 'components';
import { cssModules } from 'bpk-react-utils';

import STYLES from '../pages.scss';

const getClassName = cssModules(STYLES);

const StatusDemo = bpkDemo(Status, 'Status', 'na', {
  type: 'SUCCESS',
});
const StatusCardDemo = bpkDemo(StatusCard, 'StatusCard', 'na', {
  overallStatus: 'SUCCESS',
  data: [
    { item: 'Account information', status: 'complete' },
    { item: 'Professional profile', status: 'incomplete' },
    { item: 'Photo release', status: 'not_started' },
  ],
});

class Lab extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { className, ...rest } = this.props;

    const outerClassNameFinal = [getClassName('pages__container')];

    if (className) {
      outerClassNameFinal.push(className);
    }

    const demoClassName = getClassName('pages__bpk-demo');

    return (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <Helmet title="Lab" />
        <Section name="Lab">
          <SubSection noAnchor name="Nothing in progress at the moment" />
        </Section>
      </div>
    );
  }
}

export default Lab;
