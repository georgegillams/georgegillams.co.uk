import React from 'react';
import BpkInput, { INPUT_TYPES } from 'bpk-component-input';
import Section from '../../components/Section';
import Loading from '../../components/Loading';
import Button from '../../components/Button';
import DatabaseFunctions from '../../DatabaseFunctions';
import AdminComments from './AdminComments';
import AdminPayment from './AdminPayment';
import AdminBlog from './AdminBlog';
import AdminNotifications from './AdminNotifications';

import STYLES from '../pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

class AdminPingTest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pings: [],
    };
  }

  componentDidMount() {
    const getPings = () => {
      DatabaseFunctions.getPings(result => {
        this.setState({ pings: result });
      });
    };

    getPings();
    setInterval(getPings, 2000);
  }

  render() {
    const { className, apiKey, ...rest } = this.props;

    const classNameFinal = [];
    if (className) classNameFinal.push(className);

    return (
      <Section name="Pings">
        {this.state.pings.map(p => {
          const { timestamp } = JSON.parse(p);
          const date = new Date(timestamp);
          return (
            <div>
              Timestamp: {timestamp}
              <br />
              {date.toString()}
              <br />
              <br />
            </div>
          );
        })}
      </Section>
    );
  }
}

export default AdminPingTest;
