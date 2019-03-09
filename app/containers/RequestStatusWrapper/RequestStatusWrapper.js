import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Section, SubSection, TextLink } from 'components/Typography';
import RequestStatusContainer from 'components/RequestStatus';
import cookie from 'react-cookies';

import 'containers/pages.scss';

const getClassName = c => c;

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

    return <RequestStatusContainer statuses={messages} />;
  }
}

RequestStatusWrapper.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
};
