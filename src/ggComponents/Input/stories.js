/* eslint-disable */
import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { Input } from './index';

class StatefulInput extends Component {
  constructor(props) {
    super(props);

    this.state = { value: props.value || '', valid: null, enabled: true };
  }

  render() {
    const { value, ...rest } = this.props;
    return (
      <div>
        <Input
          name="Stateful_input"
          valid={this.state.valid}
          value={this.state.value}
          enabled={this.state.enabled}
          onChange={e => this.setState({ value: e.target.value })}
          {...rest}
        />
        {!this.state.enabled && (
          <button
            onClick={() => {
              this.setState({
                enabled: true,
              });
            }}
          >
            Enable
          </button>
        )}
        {this.state.enabled && (
          <button
            onClick={() => {
              this.setState({
                enabled: false,
              });
            }}
          >
            Disable
          </button>
        )}
        {this.state.valid !== true && (
          <button
            onClick={() => {
              this.setState({
                valid: true,
              });
            }}
          >
            Valid
          </button>
        )}
        {this.state.valid !== false && (
          <button
            onClick={() => {
              this.setState({
                valid: false,
              });
            }}
          >
            Invalid
          </button>
        )}
        {this.state.valid !== null && (
          <button
            onClick={() => {
              this.setState({
                valid: null,
              });
            }}
          >
            Reset validation
          </button>
        )}
        <br />
        <p>Current value: {this.state.value}</p>
      </div>
    );
  }
}

storiesOf('Input', module)
  .add('Default', () => <Input value="Test" />)
  .add('Valid', () => <Input value="Test" valid />)
  .add('Invalid', () => <Input value="Test" valid={false} />)
  .add('Disabled', () => <Input value="Test" enabled={false} />)
  .add('Password', () => <Input type="password" value="Test" valid />)
  .add('Stateful', () => <StatefulInput />);
