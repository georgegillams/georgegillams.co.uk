import React from 'react';
import { BpkSpinner, SPINNER_TYPES } from 'bpk-component-spinner';
import BpkInput from 'bpk-component-input';
import Section from '../components/Section';
import SubSection from '../components/SubSection';
import Button from '../components/Button';
import DatabaseFunctions from '../DatabaseFunctions';

import STYLES from './pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

class AdminComments extends React.Component {
  constructor(props) {
    super(props);

    this.state = { comments: [] };
  }

  componentDidMount() {
    const getComments = () => {
      DatabaseFunctions.getComments(this.props.pageId, (results) => {
        this.setState({ comments: results });
      });
    };

    getComments();
    setInterval(getComments, 5000);
  }

  render() {
    const {
      apiKey, pageId, className, ...rest
    } = this.props;

    const classNameFinal = [];
    if (className) classNameFinal.push(className);

    return (
      <SubSection name={this.props.pageId}>
        {this.state.comments.map(c => (
          <div>
            {c.commenterName}
            <br />
            {c.comment}
            <Button
              destructive
              onClick={() => {
                DatabaseFunctions.deleteComment(apiKey, pageId, null, c.commentId, (result) => {
                  console.log(result);
                });
              }}
            >
              Delete comment
            </Button>
          </div>
        ))}
      </SubSection>
    );
  }
}

export default AdminComments;
