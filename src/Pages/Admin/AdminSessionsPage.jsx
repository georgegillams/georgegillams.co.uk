import React from 'react';
import BpkInput, { INPUT_TYPES } from 'bpk-component-input';
import Section from '../../components/Section';
import SubSection from '../../components/SubSection';
import Loading from '../../components/Loading';
import Button from '../../components/Button';
import DatabaseFunctions from '../../DatabaseFunctions';
import AdminComments from './AdminComments';
import AdminPayment from './AdminPayment';
import AdminBlog from './AdminBlog';
import AdminNotifications from './AdminNotifications';

import STYLES from '../pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

class AdminSessionsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sessionIds: null,
      loggedInSessionIds: null,
    };
  }

  componentDidMount() {
    const getSessionIds = () => {
      if (this.props.loggedInSession) {
        DatabaseFunctions.getSessionIds(this.props.loggedInSession, result => {
          console.log(result);
          this.setState({ sessionIds: result });
        });
        DatabaseFunctions.getLoggedInSessionIds(
          this.props.loggedInSession,
          result => {
            this.setState({ loggedInSessionIds: result });
          },
        );
      }
    };

    getSessionIds();
    setInterval(getSessionIds, 2000);
  }

  render() {
    const { loggedInSession, className, ...rest } = this.props;

    const classNameFinal = [];
    if (className) classNameFinal.push(className);

    return (
      <div>
        {loggedInSession ? (
          <Section name="Sessions">
            {this.state.sessionIds ? (
              <SubSection name="Session IDs">
                {this.state.sessionIds.map(b => {
                  const session = JSON.parse(b);
                  return (
                    <div style={{ marginBottom: '1rem' }}>
                      {session.sessionId}
                      <br />
                      {session.ipAddress}
                      <br />
                      <Button
                        destructive
                        onClick={() =>
                          DatabaseFunctions.deleteSession(
                            loggedInSession,
                            session.sessionId,
                            result => {
                              console.log(result);
                            },
                          )
                        }
                      >
                        Delete session
                      </Button>
                    </div>
                  );
                })}
              </SubSection>
            ) : (
              <Loading />
            )}
            {this.state.loggedInSessionIds ? (
              <SubSection name="Logged in session IDs">
                {this.state.loggedInSessionIds.map(b => {
                  const session = JSON.parse(b);
                  return (
                    <div style={{ marginBottom: '1rem' }}>
                      {session.loggedInSessionId}
                      <br />
                      {session.ipAddress}
                      <br />
                      <Button
                        destructive
                        onClick={() =>
                          DatabaseFunctions.deleteLoggedInSession(
                            loggedInSession,
                            session.loggedInSessionId,
                            result => {
                              console.log(result);
                            },
                          )
                        }
                      >
                        Delete session
                      </Button>
                    </div>
                  );
                })}
              </SubSection>
            ) : (
              <Loading />
            )}
          </Section>
        ) : (
          <Section name="Sessions" />
        )}
      </div>
    );
  }
}

export default AdminSessionsPage;
