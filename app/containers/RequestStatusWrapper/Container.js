import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import cookie from 'react-cookies';
import { cssModules } from 'gg-components/helpers/cssModules';

import { PROJECT_UNDER_TEST } from 'helpers/constants';
import { Section, SubSection, TextLink } from 'gg-components/Typography';
import { RequestStatusContainer } from 'gg-components/RequestStatus';
import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

export default class RequestStatusWrapper extends React.Component {
  componentDidMount = () => {
    this.interval = setInterval(() => {
      this.props.purgeMessages();
    }, 500);
  };

  componentWillUnmount = () => {
    clearInterval(this.interval);
  };

  render() {
    const { messages, ...rest } = this.props;

    if (PROJECT_UNDER_TEST) {
      return null;
    }

    return <RequestStatusContainer statuses={messages} />;
  }
}

RequestStatusWrapper.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
};
