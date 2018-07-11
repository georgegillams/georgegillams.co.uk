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

import { cssModules } from 'bpk-react-utils';
const getClassName = cssModules(STYLES);

class AdminCommentsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageIds: [],
      pattern: '',
    };
  }

  componentDidMount() {
    const getPageIds = () => {
      DatabaseFunctions.getPageIds(results => {
        this.setState({ pageIds: results });
      });
    };

    getPageIds();
    setInterval(getPageIds, 2000);
  }

  render() {
    const { className, loggedInAdmin, sessionId, ...rest } = this.props;

    const classNameFinal = [];
    if (className) classNameFinal.push(className);

    const pageIdList = (
      <Section name="Page IDs">
        {this.state.pageIds.map(c => <div>{c}</div>)}
      </Section>
    );

    return (
      <div>
        <br />
        <br />
        {pageIdList}
        <br />
        <Section name="Comments">
          {this.state.pageIds.map(c => (
            <AdminComments
              sessionId={sessionId}
              loggedInAdmin={loggedInAdmin}
              pageId={c}
            />
          ))}
        </Section>
        <br />
        {loggedInAdmin && (
          <div>
            <BpkInput
              className={getClassName('pages__card')}
              id="pattern"
              name="Remove all comments containing pattern"
              value={this.state.pattern}
              onChange={event => this.setState({ pattern: event.target.value })}
              placeholder="Remove all comments containing pattern"
            />
            <br />
            <Button
              style={{ width: '100%' }}
              destructive
              onClick={() => {
                for (let i = 0; i < this.state.pageIds.length; i += 1) {
                  DatabaseFunctions.deleteComment(
                    null,
                    sessionId,
                    this.state.pageIds[i],
                    this.state.pattern,
                    null,
                    result => null,
                  );
                }
              }}
            >
              DO DAMAGE
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default AdminCommentsPage;
