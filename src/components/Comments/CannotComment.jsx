import React from 'react';
import PropTypes from 'prop-types';
import { Section, TextLink } from '../index';

class CannotComment extends React.Component {
  static propTypes = {
    className: PropTypes.string
  };

  static defaultProps = {
    className: null
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { className, ...rest } = this.props;

    const classNameFinal = [];
    if (className) classNameFinal.push(className);

    return (
      <div className={classNameFinal.join(' ')} {...rest}>
        <Section name="Want to have your say?">
          To comment you must be signed in.{" "}
          <TextLink href="/sign-up">
            Register here - it's quick and easy.
          </TextLink>
        </Section>
      </div>
    );
  }
}

CannotComment.propTypes = {
  className: PropTypes.string
};

CannotComment.defaultProps = {
  className: null
};

export default CannotComment;
