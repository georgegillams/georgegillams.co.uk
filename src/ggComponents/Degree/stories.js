/* eslint-disable */
import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { DegreeModule } from './index';

const INTERACTIVE_INCREMENT = 33;

class StatefulDegreeModule extends Component {
  constructor(props) {
    super(props);

    this.state = { markerPosition: 70, percentage: 0, filled: true };
  }

  render() {
    return (
      <div>
        <DegreeModule
          name="Test"
          markerPosition={this.state.markerPosition}
          percentage={this.state.percentage}
          filled={this.state.filled}
          {...this.props}
        />
        {this.state.markerPosition < 100 && (
          <button
            type="button"
            onClick={() => {
              this.setState({
                markerPosition:
                  this.state.markerPosition + INTERACTIVE_INCREMENT,
              });
            }}
          >
            Increment markerPosition amount
          </button>
        )}
        <button
          type="button"
          onClick={() => {
            this.setState(prevState => ({
              filled: !prevState.filled,
            }));
          }}
        >
          Toggle filled
        </button>
        {this.state.markerPosition >= 100 && (
          <button
            type="button"
            onClick={() => {
              this.setState({
                markerPosition: 0,
              });
            }}
          >
            Reset markerPosition amount
          </button>
        )}
        {this.state.percentage < 100 && (
          <button
            type="button"
            onClick={() => {
              this.setState({
                percentage: this.state.percentage + INTERACTIVE_INCREMENT,
              });
            }}
          >
            Increment percentage
          </button>
        )}
        {this.state.percentage >= 100 && (
          <button
            type="button"
            onClick={() => {
              this.setState({
                percentage: 0,
              });
            }}
          >
            Reset percentage
          </button>
        )}
      </div>
    );
  }
}

storiesOf('Degree module', module)
  .add('Default', () => (
    <DegreeModule name="Test" percentage={50} markerPosition={70} />
  ))
  .add('Unfilled', () => (
    <DegreeModule
      name="Test"
      filled={false}
      percentage={50}
      markerPosition={70}
    />
  ))
  .add('Stateful', () => <StatefulDegreeModule />);
