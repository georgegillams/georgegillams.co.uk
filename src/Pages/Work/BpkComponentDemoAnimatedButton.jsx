import React from 'react';
import PropTypes from 'prop-types';
import BpkButton from 'bpk-component-button';

const states = [
  {
    children: 'Take any component',
    disabled: false,
    destructive: false,
    featured: false,
    light: false,
    iconOnly: false,
  },
  {
    children: 'Change the props',
    disabled: true,
    destructive: false,
    featured: false,
    light: false,
    iconOnly: false,
  },
  {
    children: "Find out what's possible",
    disabled: false,
    destructive: false,
    featured: true,
    light: true,
    iconOnly: false,
  },
  {
    children: 'Imagine endless possibilites',
    disabled: false,
    destructive: false,
    featured: false,
    light: false,
    iconOnly: false,
  },
  {
    children: 'Build amazing stuff',
    disabled: false,
    destructive: true,
    featured: false,
    light: false,
    iconOnly: false,
  },
  {
    children: '💥',
    disabled: true,
    destructive: false,
    featured: true,
    light: false,
    iconOnly: true,
  },
];

class BpkComponentDemoAnimatedButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = { currentState: 0 };
  }

  componentDidMount() {
    const advanceState = () => {
      let newState = this.state.currentState + 1;
      if (newState >= states.length) {
        newState = 0;
      }
      this.setState({
        currentState: newState,
      });
    };

    setInterval(advanceState, 1000);
  }

  render() {
    return (
      <BpkButton
        disabled={states[this.state.currentState].disabled}
        featured={states[this.state.currentState].featured}
        light={states[this.state.currentState].light}
        destructive={states[this.state.currentState].destructive}
        iconOnly={states[this.state.currentState].iconOnly}
        style={{ transition: 'all .4s ease-in-out' }}
        {...this.props}
      >
        {states[this.state.currentState].children}
      </BpkButton>
    );
  }
}

BpkComponentDemoAnimatedButton.propTypes = {
  className: PropTypes.string,
};

BpkComponentDemoAnimatedButton.defaultProps = {
  className: null,
};

export default BpkComponentDemoAnimatedButton;
