import PropTypes from 'prop-types';
import React, { Component } from 'react';
import BpkRadio from 'bpk-component-radio';
import BpkCheckBox from 'bpk-component-checkbox';
import nodeImage from '../images/node.png';
import { NetworkHelpers } from 'gdp-shared';

import STYLES from './app-style.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const {
  getCorrespondingNetworkSlot,
  getSlotsCorrespondingNodeConfig,
} = NetworkHelpers;
const columnCount = 5;

class NodeButton extends Component {
  nodeButtonValiditySet = (slotNumber, event) => {
    const newNetworkSlots = JSON.parse(JSON.stringify(this.props.networkSlots));
    newNetworkSlots[slotNumber].validity = event.target.checked;
    this.props.onNetworkSlotsChanged(newNetworkSlots);
  };

  render() {
    const {
      onSelectedNodeConfigChanged,
      onNetworkSlotsChanged,
      networkSlots,
      nodeDataConfigurations,
      className,
      networkSlot,
    } = this.props;

    const row = networkSlot.slotNumber % columnCount;
    const column = Math.floor(networkSlot.slotNumber / columnCount);

    let disabled = networkSlot === null;
    if (networkSlot) {
      const node = getSlotsCorrespondingNodeConfig(
        networkSlot,
        this.props.nodeDataConfigurations,
      );
      disabled = node === null;
    }
    const valid = networkSlot ? networkSlot.validity : false;

    const classNames = [getClassName('app-style__node-representation--button')];
    if (disabled) {
      classNames.push(
        getClassName('app-style__node-representation--button--disabled'),
      );
    } else {
      classNames.push(
        getClassName('app-style__node-representation--button--not-disabled'),
      );
    }
    if (className) {
      classNames.push(className);
    }

    /* eslint-disable react/no-array-index-key */
    return (
      <div
        className={getClassName('app-style__node-representation')}
        style={{
          position: 'absolute',
          marginTop: `${0.5 + row * 3.2}rem`,
          marginLeft: `${1.3 + column * 5.6}rem`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            marginTop: '-1.8rem',
            marginLeft: '-1.2rem',
          }}
        >
          <BpkCheckBox
            disabled={disabled}
            label=""
            name="slotIsValid"
            checked={disabled ? false : valid}
            onChange={event =>
              this.nodeButtonValiditySet(networkSlot.slotNumber, event)
            }
          />
        </div>
        <button
          disabled={disabled}
          className={classNames.join(' ')}
          onClick={event =>
            onSelectedNodeConfigChanged(networkSlot.nodeNumber, event)
          }
        >
          <img
            alt={`node ${networkSlot.nodeNumber}`}
            src={nodeImage}
            className={getClassName('app-style__node-representation--image')}
          />
        </button>
      </div>
    );
  }
}
/* eslint-enable */

NodeButton.propTypes = {
  onNetworkSlotsChanged: PropTypes.func.isRequired,
  onSelectedNodeConfigChanged: PropTypes.func.isRequired,
  nodeDataConfigurations: PropTypes.arrayOf(PropTypes.object).isRequired,
  networkSlots: PropTypes.arrayOf(PropTypes.object).isRequired,
  networkSlot: PropTypes.object.isRequired,
  className: PropTypes.string,
};

NodeButton.defaultProps = {
  className: null,
};

export default NodeButton;
