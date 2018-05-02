import React from 'react';
import BpkInput from 'bpk-component-input';
import SubSection from '../../components/SubSection';
import Button from '../../components/Button';
import DatabaseFunctions from '../../DatabaseFunctions';

import STYLES from '../pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

class AdminNotificationsw extends React.Component {
  constructor(props) {
    super(props);

    this.state = { notifications: [] };
  }

  componentDidMount() {
    const getNotifications = () => {
      DatabaseFunctions.getNotifications(results => {
        this.setState({ notifications: results });
      });
    };

    getNotifications();
    setInterval(getNotifications, 5000);
  }

  render() {
    const { apiKey, className, ...rest } = this.props;

    const classNameFinal = [];
    if (className) classNameFinal.push(className);

    return (
      <div className={getClassName('pages__card')}>
        {this.state.notifications.map(n => (
          <div>
            {n.notificationMessage}
            <br />
            {n.notificationType}
            <br />
            <Button
              destructive
              onClick={() => {
                DatabaseFunctions.deleteNotification(
                  apiKey,
                  n.notificationId,
                  result => {
                    console.log(result);
                  },
                );
              }}
            >
              Delete notification
            </Button>
          </div>
        ))}
        <br />
        <br />
        <BpkInput
          className={getClassName('pages__card')}
          id="message"
          name="Notification message"
          value={this.state.message}
          onChange={event => this.setState({ message: event.target.value })}
          placeholder="Notification message"
        />

        <br />
        <BpkInput
          className={getClassName('pages__card')}
          id="type"
          name="Notification type"
          value={this.state.type}
          onChange={event => this.setState({ type: event.target.value })}
          placeholder="Notification type"
        />

        <br />
        <Button
          onClick={() => {
            DatabaseFunctions.createNotification(
              apiKey,
              this.state.message,
              this.state.type,
              result => {
                console.log(result);
              },
            );
          }}
        >
          Add notification
        </Button>
      </div>
    );
  }
}

export default AdminNotificationsw;
