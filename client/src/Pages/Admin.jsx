import React from 'react';
import { BpkSpinner, SPINNER_TYPES } from 'bpk-component-spinner';
import BpkInput from 'bpk-component-input';
import Section from '../components/Section';
import SubSection from '../components/SubSection';
import Button from '../components/Button';
import DatabaseFunctions from '../DatabaseFunctions';
import AdminComments from './AdminComments';

import STYLES from './pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

class Admin extends React.Component {
  constructor(props) {
    super(props);

    this.state = { pageIds: [], apiKey: '', pattern: '' };
  }

  componentDidMount() {
    const getPageIds = () => {
      DatabaseFunctions.getPageIds((results) => {
        this.setState({ pageIds: results });
      });
    };

    getPageIds();
    setInterval(getPageIds, 5000);
  }

  render() {
    const { className, ...rest } = this.props;

    const classNameFinal = [];
    if (className) classNameFinal.push(className);

    const pageIdList = (
      <SubSection name="Page IDs">{this.state.pageIds.map(c => <div>{c}</div>)}</SubSection>
    );

    return (
      <Section name="So, you found my admin page!" className={classNameFinal.join(' ')}>
        Check you out, you l33T H4cK3R. Unfortunately you're not going to get very far without my
        private API-Key!
        <br />
        <br />
        <BpkInput
          className={getClassName('pages__card')}
          id="apiKey"
          name="API Key"
          value={this.state.apiKey}
          onChange={event => this.setState({ apiKey: event.target.value })}
          placeholder="API Key"
        />
        <br />
        <br />
        {pageIdList}
        <br />
        {this.state.pageIds.map(c => <AdminComments apiKey={this.state.apiKey} pageId={c} />)}
        <br />
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
                this.state.apiKey,
                this.state.pageIds[i],
                this.state.pattern,
                (result) => {
                  console.log(result);
                },
              );
            }
          }}
        >
          DO DAMAGE
        </Button>
      </Section>
    );
  }
}

export default Admin;
