import React from 'react';
import PropTypes from 'prop-types';
import BpkInput, { INPUT_TYPES } from 'bpk-component-input';
import { TextLink, Button } from '../index';
import { cssModules } from 'bpk-react-utils';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../utils/constants';

import STYLES from './forms.scss';

const getClassName = cssModules(STYLES);

class LoginForm extends React.Component {
  static propTypes = {
    notification: PropTypes.object.isRequired,
    onDataChanged: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  onTypeChanged = event => {
    const newValue = JSON.parse(JSON.stringify(this.props.notification));
    newValue.type = event.target.value;
    this.props.onDataChanged(newValue);
  };

  onMessageChanged = event => {
    const newValue = JSON.parse(JSON.stringify(this.props.notification));
    newValue.message = event.target.value;
    this.props.onDataChanged(newValue);
  };

  render() {
    const {
      className,
      notification,
      onDataChanged,
      onSubmit,
      ...rest
    } = this.props;

    const classNameFinal = [];
    if (className) classNameFinal.push(className);

    return (
      <div className={classNameFinal.join(' ')} {...rest}>
        <BpkInput
          className={getClassName('forms__component')}
          id="type"
          name="type"
          value={notification.type}
          onChange={this.onTypeChanged}
          placeholder="type"
        />
        <BpkInput
          className={getClassName('forms__component')}
          id="message"
          name="message"
          value={notification.message}
          onChange={this.onMessageChanged}
          placeholder="message"
        />
        <br />
        <Button className={getClassName('forms__component')} onClick={onSubmit}>
          Create notification
        </Button>
      </div>
    );
  }
}

LoginForm.propTypes = {
  centered: PropTypes.bool,
  className: PropTypes.string,
};

LoginForm.defaultProps = {
  centered: false,
  className: null,
};

export default LoginForm;