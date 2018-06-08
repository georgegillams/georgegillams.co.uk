import React from 'react';
import BpkInput from 'bpk-component-input';
import SubSection from '../../components/SubSection';
import Button from '../../components/Button';
import DatabaseFunctions from '../../DatabaseFunctions';

import STYLES from '../pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

class AdminNotifications extends React.Component {
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
    setInterval(getNotifications, 1000);
  }

  render() {
    const { loggedInAdmin, sessionId, className, ...rest } = this.props;

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
            {loggedInAdmin && (
              <Button
                destructive
                onClick={() => {
                  DatabaseFunctions.deleteNotification(
                    sessionId,
                    n.notificationId,
                    result => null,
                  );
                }}
              >
                Delete notification
              </Button>
            )}
          </div>
        ))}
        {loggedInAdmin && (
          <div>
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
                  sessionId,
                  this.state.message,
                  this.state.type,
                  result => null,
                );
              }}
            >
              Add notification
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default AdminNotifications;
