import React from 'react';
import SubSection from '../../components/SubSection';
import Button from '../../components/Button';
import DatabaseFunctions from '../../DatabaseFunctions';

import STYLES from '../pages.scss';

const getClassName = className => className; //STYLES[className] || 'UNKNOWN';

class AdminComments extends React.Component {
  constructor(props) {
    super(props);

    this.state = { comments: [] };
  }

  componentDidMount() {
    const getComments = () => {
      DatabaseFunctions.getComments(this.props.pageId, results => {
        this.setState({ comments: results });
      });
    };

    getComments();
    setInterval(getComments, 1000);
  }

  render() {
    const {
      loggedInAdmin,
      sessionId,
      pageId,
      className,
      ...rest
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
            {loggedInAdmin && (
              <Button
                destructive
                onClick={() => {
                  DatabaseFunctions.deleteComment(
                    sessionId,
                    pageId,
                    null,
                    c.commentId,
                    result => null,
                  );
                }}
              >
                Delete comment
              </Button>
            )}
          </div>
        ))}
      </SubSection>
    );
  }
}

export default AdminComments;
